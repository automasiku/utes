'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/Button';
import { Loader2, Settings, ArrowRight } from 'lucide-react';
import { QUIZ_CONFIG_OPTIONS, QuizConfiguration } from '@/lib/constants';
import { generateQuizFromTranscript, generateEssayFromTranscript, QuizQuestion, EssayQuestion } from '@/app/actions/openai';
import { saveQuizSession } from '@/app/actions/quiz';

export default function QuizConfigurationPage() {
  const router = useRouter();
  const {
    quizMode,
    youtubeTranscript,
    youtubeMetadata,
    inputUrl,
    quizConfig,
    setQuizConfig,
    setGeneratedQuiz,
    setGeneratedEssay,
    setQuizSessionId,
    setCurrentVideoInfo,
    setEssayAnswers,
    setEssayScores,
    setCurrentQuestionIdx,
    setScore,
    setSelectedAnswer,
    setIsAnswered,
    setEssayAnswer,
    setEssayFeedbackMode,
  } = useQuiz();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateConfig = <K extends keyof QuizConfiguration>(key: K, value: QuizConfiguration[K]) => {
    setQuizConfig({ ...quizConfig, [key]: value });
  };

  const handleStartQuiz = async () => {
    if (!youtubeTranscript?.text) {
      setError('Transkrip tidak tersedia. Silakan coba lagi.');
      return;
    }

    setLoading(true);
    setError(null);

    // Reset state
    setCurrentQuestionIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setEssayAnswer('');
    setEssayFeedbackMode(false);

    try {
      // Generate questions based on mode
      const questions = quizMode === 'nob'
        ? await generateQuizFromTranscript(
            youtubeTranscript.text,
            quizConfig.numberOfQuestions,
            quizConfig.difficulty,
            quizConfig.learningObjective
          )
        : await generateEssayFromTranscript(
            youtubeTranscript.text,
            quizConfig.numberOfQuestions,
            quizConfig.difficulty,
            quizConfig.learningObjective
          );

      // Set generated questions
      if (quizMode === 'nob') {
        setGeneratedQuiz(questions as QuizQuestion[]);
      } else {
        setGeneratedEssay(questions as EssayQuestion[]);
        setEssayAnswers(new Array(questions.length).fill(''));
        setEssayScores(new Array(questions.length).fill(null));
      }

      // Save quiz session
      const sessionResult = await saveQuizSession({
        videoId: youtubeMetadata?.videoId || '',
        videoTitle: youtubeMetadata?.title || '',
        videoUrl: inputUrl,
        videoThumbnail: youtubeMetadata?.thumbnail,
        videoChannel: youtubeMetadata?.channel,
        videoDuration: youtubeMetadata?.duration,
        quizMode,
        questions,
        transcriptText: youtubeTranscript.text,
      });

      if (sessionResult.data?.id) {
        setQuizSessionId(sessionResult.data.id);
      }

      setCurrentVideoInfo({
        videoId: youtubeMetadata?.videoId || '',
        videoTitle: youtubeMetadata?.title || '',
        videoUrl: inputUrl,
      });

      router.push(quizMode === 'nob' ? '/quiz' : '/essay');
    } catch (err) {
      console.error(err);
      setError('Gagal membuat soal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Settings className="w-8 h-8 text-sky-600" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Konfigurasi {quizMode === 'nob' ? 'Quiz' : 'Essay'}
          </h2>
          <p className="text-slate-600 text-sm lg:text-base">
            Sesuaikan pengaturan sebelum memulai latihan
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 space-y-6">
          {/* Jumlah Soal */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Jumlah Soal
            </label>
            <div className="grid grid-cols-4 gap-3">
              {QUIZ_CONFIG_OPTIONS.QUESTION_COUNTS.map((count) => (
                <button
                  key={count}
                  onClick={() => updateConfig('numberOfQuestions', count)}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                    quizConfig.numberOfQuestions === count
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Tingkat Kesulitan */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Tingkat Kesulitan
            </label>
            <div className="space-y-2">
              {QUIZ_CONFIG_OPTIONS.DIFFICULTIES.map((diff) => (
                <button
                  key={diff.value}
                  onClick={() => updateConfig('difficulty', diff.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    quizConfig.difficulty === diff.value
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-800">{diff.label}</div>
                  <div className="text-sm text-slate-600 mt-1">{diff.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tujuan Pembelajaran */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Tujuan Pembelajaran
            </label>
            <div className="space-y-2">
              {QUIZ_CONFIG_OPTIONS.LEARNING_OBJECTIVES.map((obj) => (
                <button
                  key={obj.value}
                  onClick={() => updateConfig('learningObjective', obj.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    quizConfig.learningObjective === obj.value
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{obj.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">{obj.label}</div>
                      <div className="text-sm text-slate-600 mt-1">{obj.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => router.back()}
            variant="secondary"
            className="flex-1"
            disabled={loading}
          >
            Kembali
          </Button>
          <Button
            onClick={handleStartQuiz}
            variant={quizMode === 'nob' ? 'nob' : 'legend'}
            className="flex-1"
            icon={loading ? Loader2 : ArrowRight}
            disabled={loading}
          >
            {loading ? 'Membuat Soal...' : 'Mulai Latihan'}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

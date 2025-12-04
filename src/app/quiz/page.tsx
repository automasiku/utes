'use client';

import { Gamepad2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { AppLayout } from '@/components/AppLayout';
import { useQuiz } from '@/context/QuizContext';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const {
    activeQuiz,
    currentQuestionIdx,
    selectedAnswer,
    isAnswered,
    setSelectedAnswer,
    setIsAnswered,
    score,
    setScore,
    setCurrentQuestionIdx,
  } = useQuiz();
  const router = useRouter();

  const question = activeQuiz[currentQuestionIdx];
  const progressPercent = ((currentQuestionIdx + 1) / activeQuiz.length) * 100;

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (idx === question.correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < activeQuiz.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      router.push('/result');
    }
  };

  return (
    <AppLayout>
    <div className="max-w-2xl mx-auto py-8 px-4 min-h-screen flex flex-col">
      <div className="mb-6 lg:mb-8 space-y-2">
        <div className="flex justify-between items-center">
           <div className="flex items-center gap-2 text-xs lg:text-sm font-medium text-sky-600 bg-sky-50 px-2 lg:px-3 py-1 rounded-full">
             <Gamepad2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> Level Nob
           </div>
           <span className="text-xs lg:text-sm font-medium text-slate-500">Soal {currentQuestionIdx + 1}/{activeQuiz.length}</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sky-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <Card className="flex-1 flex flex-col">
        <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-6 lg:mb-8 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3 mb-6 lg:mb-8">
          {question.options.map((opt: string, idx: number) => {
            let btnClass = "w-full p-3 lg:p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between group text-sm lg:text-base ";
            
            if (isAnswered) {
              if (idx === question.correct) {
                btnClass += "border-green-500 bg-green-50 text-green-800";
              } else if (idx === selectedAnswer) {
                btnClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                btnClass += "border-slate-100 text-slate-400 opacity-50";
              }
            } else {
              if (selectedAnswer === idx) {
                btnClass += "border-sky-600 bg-sky-50 text-sky-900";
              } else {
                btnClass += "border-slate-100 text-slate-700 hover:border-sky-200 hover:bg-slate-50";
              }
            }

            return (
              <button 
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={btnClass}
              >
                <span className="font-medium">{opt}</span>
                {isAnswered && idx === question.correct && <CheckCircle2 className="text-green-600 w-4 h-4 lg:w-5 lg:h-5" />}
                {isAnswered && idx === selectedAnswer && idx !== question.correct && <AlertCircle className="text-red-500 w-4 h-4 lg:w-5 lg:h-5" />}
              </button>
            );
          })}
        </div>

        <div className="mt-auto flex justify-end pt-4 border-t border-slate-100">
           <Button 
              onClick={nextQuestion} 
              variant="nob"
              disabled={!isAnswered}
              className={!isAnswered ? "opacity-50 cursor-not-allowed bg-slate-300" : ""}
              icon={ArrowRight}
           >
             {currentQuestionIdx === activeQuiz.length - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
           </Button>
        </div>
      </Card>
    </div>
    </AppLayout>
  );
}

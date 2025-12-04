'use client';

import { Flame, PenTool, BrainCircuit, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { AppLayout } from '@/components/AppLayout';
import { useQuiz } from '@/context/QuizContext';
import { useRouter } from 'next/navigation';

export default function EssayPage() {
  const {
    activeEssay,
    currentQuestionIdx,
    essayAnswer,
    setEssayAnswer,
    essayFeedbackMode,
    setEssayFeedbackMode,
    score,
    setScore,
    setCurrentQuestionIdx,
  } = useQuiz();
  const router = useRouter();

  const question = activeEssay[currentQuestionIdx];
  const progressPercent = ((currentQuestionIdx + 1) / activeEssay.length) * 100;

  const submitEssay = () => {
    if (!essayAnswer.trim()) return;
    setEssayFeedbackMode(true);
    setScore(s => s + 1);
  };

  const nextEssay = () => {
    if (currentQuestionIdx < activeEssay.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setEssayAnswer('');
      setEssayFeedbackMode(false);
    } else {
      router.push('/result');
    }
  };

  return (
    <AppLayout>
    <div className="max-w-2xl mx-auto py-8 px-4 min-h-screen flex flex-col">
      <div className="mb-6 lg:mb-8 space-y-2">
         <div className="flex justify-between items-center">
           <div className="flex items-center gap-2 text-xs lg:text-sm font-medium text-orange-600 bg-orange-50 px-2 lg:px-3 py-1 rounded-full">
             <Flame className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> Level Legend
           </div>
           <span className="text-xs lg:text-sm font-medium text-slate-500">Soal {currentQuestionIdx + 1}/{activeEssay.length}</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <Card className="flex-1 flex flex-col">
        <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-4 lg:mb-6 leading-relaxed">
          {question.question}
        </h3>

        {!essayFeedbackMode ? (
          <div className="flex-1 flex flex-col space-y-4">
            <div className="relative flex-1">
              <PenTool className="absolute left-3 top-3 text-slate-400 w-4 h-4 lg:w-5 lg:h-5" />
              <textarea 
                className="w-full h-full min-h-[150px] lg:min-h-[200px] p-3 lg:p-4 pl-9 lg:pl-10 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none text-base lg:text-lg resize-none"
                placeholder="Tulis jawabanmu di sini..."
                value={essayAnswer}
                onChange={(e) => setEssayAnswer(e.target.value)}
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button 
                onClick={submitEssay}
                variant="legend"
                disabled={!essayAnswer.trim()}
                className={!essayAnswer.trim() ? "opacity-50 cursor-not-allowed bg-slate-300" : ""}
              >
                Kirim Jawaban
              </Button>
            </div>
          </div>
        ) : (
           <div className="flex-1 flex flex-col space-y-4 lg:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-50 p-3 lg:p-4 rounded-xl border border-slate-200">
                <p className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase mb-1 lg:mb-2">Jawaban Kamu</p>
                <p className="text-slate-800 text-sm lg:text-base">{essayAnswer}</p>
              </div>
              
              <div className="bg-green-50 p-3 lg:p-4 rounded-xl border border-green-200 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-2 opacity-10">
                    <BrainCircuit className="text-green-600 w-12 h-12 lg:w-16 lg:h-16" />
                 </div>
                 <p className="text-[10px] lg:text-xs font-bold text-green-700 uppercase mb-1 lg:mb-2 flex items-center gap-2">
                   <BrainCircuit className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> Analisis AI
                 </p>
                 <p className="text-green-900 font-medium text-xs lg:text-sm mb-1 lg:mb-2">Poin Penting:</p>
                 <p className="text-green-800 text-xs lg:text-sm leading-relaxed">{question.modelAnswer}</p>
              </div>

              <div className="mt-auto flex justify-end pt-4 border-t border-slate-100">
                <Button 
                    onClick={nextEssay} 
                    variant="legend"
                    icon={ArrowRight}
                >
                  {currentQuestionIdx === activeEssay.length - 1 ? 'Lihat Hasil Akhir' : 'Lanjut'}
                </Button>
              </div>
           </div>
        )}
      </Card>
    </div>
    </AppLayout>
  );
}

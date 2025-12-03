'use client';

import { Gamepad2, Flame, ChevronRight } from 'lucide-react';
import { useQuiz } from '@/context/QuizContext';
import { useRouter } from 'next/navigation';

export default function SelectLevelPage() {
  const { setQuizMode, setCurrentQuestionIdx, setScore, setSelectedAnswer, setIsAnswered, setEssayAnswer, setEssayFeedbackMode } = useQuiz();
  const router = useRouter();

  const handleLevelSelect = (mode: 'nob' | 'legend') => {
    setQuizMode(mode);
    setCurrentQuestionIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setEssayAnswer('');
    setEssayFeedbackMode(false);
    
    if (mode === 'nob') {
      router.push('/quiz');
    } else {
      router.push('/essay');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
       <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Pilih Level Tantangan</h2>
        <p className="text-slate-600">Seberapa dalam kamu ingin menguji pemahamanmu?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button 
          onClick={() => handleLevelSelect('nob')}
          className="relative group bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-100 transition-all text-left flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Gamepad2 size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">NOB</h3>
          <div className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-bold mb-4 w-fit">
            PILIHAN GANDA
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
            Cocok untuk pemula. Tinggal klik jawaban yang menurutmu benar. Santai tapi tetap menguji ingatan.
          </p>
          <div className="flex items-center text-sky-600 font-semibold text-sm mt-auto">
            Pilih Level Nob <ChevronRight size={16} />
          </div>
        </button>

        <button 
          onClick={() => handleLevelSelect('legend')}
          className="relative group bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-100 transition-all text-left flex flex-col h-full overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
          
          <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform z-10">
            <Flame size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 z-10">LEGEND</h3>
          <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold mb-4 w-fit z-10">
            ESSAY / URAIAN
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 z-10">
            Ujian sesungguhnya. Jawab dengan kata-katamu sendiri. Sistem akan menilai kedalaman pemahamanmu.
          </p>
          <div className="flex items-center text-orange-600 font-semibold text-sm mt-auto z-10">
            Pilih Level Legend <ChevronRight size={16} />
          </div>
        </button>
      </div>
    </div>
  );
}

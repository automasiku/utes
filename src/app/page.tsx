'use client';

import { Youtube, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { useQuiz } from '@/context/QuizContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { inputUrl, setInputUrl } = useQuiz();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      router.push('/verify');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 max-w-2xl mx-auto text-center space-y-8">
      <div className="bg-indigo-100 p-4 rounded-full text-indigo-600 mb-4">
        <BookOpen size={48} />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
        Utes
      </h1>
      <p className="text-lg text-slate-600">
        Belajar otodidak jadi lebih efektif. Masukkan link video, kami buatkan latihan soal untukmu.
      </p>
      
      <form onSubmit={handleSubmit} className="w-full relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <Youtube size={24} />
        </div>
        <input 
          type="text" 
          placeholder="https://youtube.com/watch?v=..." 
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-lg transition-all shadow-sm"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <div className="mt-6 flex justify-center">
          <Button type="submit" icon={ArrowRight}>
            Mulai Belajar
          </Button>
        </div>
      </form>

      <div className="flex gap-6 text-sm text-slate-500 pt-8">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-green-500" />
          <span>Analisis Transkrip AI</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-green-500" />
          <span>Mode Nob & Legend</span>
        </div>
      </div>
    </div>
  );
}

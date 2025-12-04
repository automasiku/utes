'use client';

import { Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { AppLayout } from '@/components/AppLayout';
import { useQuiz } from '@/context/QuizContext';
import { useRouter } from 'next/navigation';

export default function ProgressCheckPage() {
  const { progressTime, setProgressTime, progressTopic, setProgressTopic } = useQuiz();
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/confirm-topic');
  };

  return (
    <AppLayout>
    <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
      <button 
        onClick={() => router.push('/verify')} 
        className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-sm font-medium"
      >
        &larr; Kembali
      </button>
      
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">Tentukan Batas Materi</h2>
        <p className="text-slate-600 text-sm lg:text-base">Bantu sistem memahami sejauh mana kamu belajar agar soal yang dibuat relevan.</p>
      </div>

      <Card className="space-y-4 lg:space-y-6">
        <div>
          <label className="block text-xs lg:text-sm font-medium text-slate-700 mb-2">
            Sampai menit ke berapa kamu menonton?
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 text-slate-400 w-4 h-4 lg:w-5 lg:h-5" />
            <input 
              type="text" 
              placeholder="Contoh: 05:30" 
              className="w-full pl-9 lg:pl-10 p-2.5 lg:p-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm lg:text-base"
              value={progressTime}
              onChange={(e) => setProgressTime(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs lg:text-sm font-medium text-slate-700 mb-2">
            Topik atau pembahasan terakhir yang kamu ingat?
          </label>
          <textarea 
            rows={3}
            placeholder="Contoh: Pembahasan tentang perbedaan var, let, dan const..." 
            className="w-full p-2.5 lg:p-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none text-sm lg:text-base"
            value={progressTopic}
            onChange={(e) => setProgressTopic(e.target.value)}
          />
        </div>

        <Button onClick={handleSubmit} className="w-full justify-center" icon={CheckCircle2}>
          Analisis Materi Ini
        </Button>
      </Card>
    </div>
    </AppLayout>
  );
}

'use client';

import { Clock, PlayCircle, Target } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { AppLayout } from '@/components/AppLayout';
import { MOCK_VIDEO } from '@/data/mockData';
import { useQuiz } from '@/context/QuizContext';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const { setIsFullVideo } = useQuiz();
  const router = useRouter();

  const handleFullVideo = () => {
    setIsFullVideo(true);
    router.push('/select-level');
  };

  const handlePartialVideo = () => {
    setIsFullVideo(false);
    router.push('/progress-check');
  };

  return (
    <AppLayout>
    <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
      <button 
        onClick={() => router.push('/')} 
        className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-sm font-medium mb-4"
      >
        &larr; Kembali
      </button>

      <h2 className="text-xl lg:text-2xl font-bold text-slate-900">Video Ditemukan</h2>
      
      <Card className="overflow-hidden p-0">
        <div className="h-40 lg:h-48 w-full relative">
          <img src={MOCK_VIDEO.thumbnail} className="w-full h-full object-cover" alt="Thumb" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
             <PlayCircle className="text-white opacity-80 w-10 h-10 lg:w-12 lg:h-12" />
          </div>
        </div>
        <div className="p-4 lg:p-6">
          <h3 className="font-bold text-base lg:text-lg mb-1">{MOCK_VIDEO.title}</h3>
          <p className="text-slate-500 text-xs lg:text-sm flex items-center gap-2">
             <span>{MOCK_VIDEO.channel}</span>
             <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
             <Clock className="w-3 h-3 lg:w-3.5 lg:h-3.5" /> {MOCK_VIDEO.duration}
          </p>
        </div>
      </Card>

      <div className="bg-indigo-50 rounded-xl p-4 lg:p-6 border border-indigo-100 space-y-4">
        <h3 className="font-semibold text-indigo-900 flex items-center gap-2 text-sm lg:text-base">
          <Target className="w-4 h-4 lg:w-5 lg:h-5" />
          Status Pengetahuan
        </h3>
        <p className="text-indigo-800/80">
          Apakah kamu sudah menonton dan menyelesaikan semua materi di video ini?
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Button 
            onClick={handleFullVideo}
            className="w-full justify-center"
          >
            Ya, Sudah Selesai
          </Button>
          <Button 
            variant="secondary"
            onClick={handlePartialVideo}
            className="w-full justify-center"
          >
            Belum Selesai
          </Button>
        </div>
      </div>
    </div>
    </AppLayout>
  );
}

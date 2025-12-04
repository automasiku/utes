'use client';

import { BookOpen } from 'lucide-react';
import { Button } from '@/components/Button';
import { AppLayout } from '@/components/AppLayout';
import { useQuiz } from '@/context/QuizContext';
import { useRouter } from 'next/navigation';

export default function ConfirmTopicPage() {
  const { progressTime, progressTopic } = useQuiz();
  const router = useRouter();

  return (
    <AppLayout>
    <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
      <div className="bg-green-50 border border-green-100 rounded-2xl p-4 lg:p-6 text-center space-y-4">
        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <BookOpen className="w-6 h-6 lg:w-8 lg:h-8" />
        </div>
        <h2 className="text-lg lg:text-xl font-bold text-green-900">Materi Terkonfirmasi!</h2>
        <p className="text-green-800 text-sm lg:text-base">
          Sistem siap membuat latihan soal berdasarkan data yang kamu berikan.
        </p>
        
        <div className="bg-white/60 rounded-xl p-4 text-left space-y-2 text-xs lg:text-sm border border-green-100">
          <div className="flex justify-between">
            <span className="text-slate-500">Rentang Waktu:</span>
            <span className="font-semibold text-slate-800">00:00 - {progressTime || "Full Video"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Fokus Topik:</span>
            <span className="font-semibold text-slate-800 truncate max-w-[150px] lg:max-w-[200px]">{progressTopic || "Materi Lengkap"}</span>
          </div>
        </div>

        <Button onClick={() => router.push('/select-level')} className="w-full justify-center">
          Pilih Level Soal
        </Button>
      </div>
    </div>
    </AppLayout>
  );
}

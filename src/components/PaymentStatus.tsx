"use client";

import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {CheckCircle, Clock, XCircle, Loader2} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

interface PaymentSession {
  id: string;
  status: string;
  payment_status: string;
  customer_email: string;
  amount_total: number;
  currency: string;
  metadata?: Record<string, string>;
  created: number;
}

export function PaymentStatus() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Error fetching payment status');
        }
        
        setSession(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (!sessionId) {
    return null;
  }

  if (loading) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Verificando estado del pago...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto border-red-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="h-4 w-4" />
            Error: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            No se encontró información del pago
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = () => {
    switch (session.payment_status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'unpaid':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (session.payment_status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Pagado</Badge>;
      case 'unpaid':
        return <Badge variant="secondary">Pendiente</Badge>;
      default:
        return <Badge variant="destructive">Error</Badge>;
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('es-ES');
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Estado del Pago
        </CardTitle>
        <CardDescription>
          ID de sesión: {session.id}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Estado:</span>
          {getStatusBadge()}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Monto:</span>
          <span className="font-semibold">
            {formatAmount(session.amount_total, session.currency)}
          </span>
        </div>
        
        {session.customer_email && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Email:</span>
            <span className="text-sm">{session.customer_email}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Fecha:</span>
          <span className="text-sm">{formatDate(session.created)}</span>
        </div>

        {session.payment_status === 'paid' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              ✅ Tu pago se ha procesado correctamente. Ya tienes acceso completo a tu plan.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

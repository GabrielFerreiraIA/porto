import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  nome: z.string().min(3),
  whatsapp: z.string().min(10),
  perfil: z.string().min(1),
  cnpj: z.string().min(1),
  beneficiarios: z.string().optional(),
  origem: z.string().optional(),
  timestamp: z.string().optional(),
  plano_de_saude: z.string().optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 422 });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL || "https://n8n.server.sermelhor.site/webhook/leads-elih";
  if (!webhookUrl) {
    console.error("N8N_WEBHOOK_URL não configurado");
    return NextResponse.json({ error: "Configuração interna ausente" }, { status: 500 });
  }

  const payload = {
    ...parsed.data,
    origem: "site-porto-elih",
    timestamp: new Date().toISOString(),
    source_url: request.headers.get("referer") ?? "direto",
  };

  const n8nResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!n8nResponse.ok) {
    console.error("Erro ao enviar para N8N:", n8nResponse.status);
    return NextResponse.json({ error: "Erro ao processar lead" }, { status: 502 });
  }

  return NextResponse.json({ success: true, message: "Lead recebido com sucesso" });
}

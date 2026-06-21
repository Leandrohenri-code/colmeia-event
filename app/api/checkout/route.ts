import { NextResponse } from 'next/server'

export async function POST() {
  const accessToken = process.env.MP_ACCESS_TOKEN

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Gateway de pagamento não configurado.' },
      { status: 503 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3001'

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            id: 'ingresso-colmeia-001',
            title: 'Ingresso Colmeia — Open Vodka',
            description: 'Ingresso individual. Incluso: open vodka + energético liberado.',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 50.0,
          },
        ],
        back_urls: {
          success: `${baseUrl}/obrigado`,
          failure: `${baseUrl}/erro`,
          pending: `${baseUrl}/pendente`,
        },
        auto_return: 'approved',
        statement_descriptor: 'COLMEIA EVENTO',
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('[checkout] Erro MP:', err)
      return NextResponse.json({ error: 'Erro ao criar preferência.' }, { status: 500 })
    }

    const data = await response.json()
    const isProd = !accessToken.startsWith('TEST-')

    return NextResponse.json({
      url: isProd ? data.init_point : data.sandbox_init_point,
    })
  } catch (error) {
    console.error('[checkout] Erro interno:', error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}

# Para a Bruna ❤️

Site surpresa de aniversário — Next.js + TypeScript + Tailwind + Framer Motion.

## Rodar localmente

```bash
npm install
npm run dev
```

Depois abra [http://localhost:3000](http://localhost:3000) (ou acesse pelo celular na mesma rede via `http://SEU-IP-LOCAL:3000`).

## Build de produção (verificação antes do deploy)

```bash
npm run build
npm run start
```

## Deploy no Vercel

1. Suba este projeto num repositório Git (GitHub/GitLab).
2. Em [vercel.com](https://vercel.com), clique em "New Project" e importe o repositório.
3. Nenhuma variável de ambiente é necessária — não há backend.
4. Deploy. Gere o QR code a partir da URL final gerada pela Vercel.

## O que editar

| Quero mudar...              | Arquivo(s)                                           |
|------------------------------|-------------------------------------------------------|
| Os textos da introdução      | `components/Intro.tsx` (array `LINES`)               |
| Os textos da pergunta SIM/NÃO| `components/SurpriseQuestion.tsx`                     |
| Os textos antes das opções   | `components/Reveal.tsx`                               |
| Os textos finais / assinatura| `components/FinalSection.tsx`                         |
| As 3 opções de viagem (título, descrição, links, bullets) | `lib/destinations.ts`   |
| As fotos de cada opção        | `public/images/romont`, `public/images/chamonix`, `public/images/custom` |
| As cores (bordô, rosa, dourado, creme) | `tailwind.config.ts` (seção `colors`)        |
| A fonte dos títulos/corpo     | `app/layout.tsx` (imports de `next/font/google`)     |

### Trocar as fotos

As fotos usadas agora são placeholders gerados automaticamente (fundo degradê com o nome do lugar). Para colocar as fotos reais, **basta substituir os arquivos mantendo exatamente os mesmos nomes**:

```text
public/images/
  romont/
    cover.jpg   ← foto principal do bivouac (Romont)
    01.jpg
    02.jpg
    03.jpg
  chamonix/
    cover.jpg   ← foto principal da cabana (Chamonix)
    01.jpg
    02.jpg
    03.jpg
  custom/
    cover.jpg   ← imagem genérica de tiny house / cabana romântica
```

Fotos sugeridas para baixar:
- **Romont**: página oficial [fribourg.ch — Bivouacs dans les arbres](https://fribourg.ch/fr/romontregion/hebergements-insolites/bivouacs-dans-les-arbres/)
- **Chamonix**: página [Smartbox — 2 nuits insolites en cabane près de Chamonix](https://www.smartbox.com/ch/fr/nos-smartbox/sejour/2-nuits-insolites-en-cabane-pres-de-chamonix-mont-blanc-1581163.html)
- **Custom**: qualquer foto elegante de tiny house / cabana que você escolher

Se uma foto não existir ou não carregar, o site mostra automaticamente um fallback elegante ("Foto em breve") em vez de quebrar o layout.

### Trocar os links

Em `lib/destinations.ts`, cada destino tem um campo `link: { label, url }`. Basta editar a `url`.

### Trocar a assinatura final

Em `components/FinalSection.tsx`, no final do arquivo: `— ANTHONY`.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (animações e transições)
- lucide-react (ícones)
- Nenhum backend / banco de dados — a escolha de destino fica só no state React

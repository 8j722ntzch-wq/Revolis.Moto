import type { ProductPhoto } from './types.ts';
import type { ProductColorId } from '../product-colors.ts';
/** User-supplied photos; shared Striker files are referenced, never duplicated. */
export const productMedia: Record<string, { defaultColor: ProductColorId; photos: ProductPhoto[] }> = {
  "baltmotors-400-efi": {
    "defaultColor": "green",
    "photos": [
      {
        "src": "/assets/products/baltmotors-400-efi/striker-400__green__01-front-right-no-backrest.webp",
        "alt": "baltmotors 400 efi — зелёный, вид спереди справа, без пассажирской спинки",
        "width": 1920,
        "height": 1920,
        "color": "green"
      }
    ]
  },
  "baltmotors-500-efi": {
    "defaultColor": "gray",
    "photos": [
      {
        "src": "/assets/products/striker-shared/striker-shared__black__01-front-right.webp",
        "alt": "baltmotors 500 efi — чёрный, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "black"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__camouflage__01-front-right.webp",
        "alt": "baltmotors 500 efi — камуфляж, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "camouflage"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__green__01-front-right.webp",
        "alt": "baltmotors 500 efi — зелёный, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "green"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__light-gray__01-front-right.webp",
        "alt": "baltmotors 500 efi — серый, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "gray"
      }
    ]
  },
  "baltmotors-500-efi-eps": {
    "defaultColor": "black",
    "photos": [
      {
        "src": "/assets/products/striker-shared/striker-shared__black__01-front-right.webp",
        "alt": "baltmotors 500 efi eps — чёрный, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "black"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__camouflage__01-front-right.webp",
        "alt": "baltmotors 500 efi eps — камуфляж, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "camouflage"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__green__01-front-right.webp",
        "alt": "baltmotors 500 efi eps — зелёный, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "green"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__light-gray__01-front-right.webp",
        "alt": "baltmotors 500 efi eps — серый, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "gray"
      }
    ]
  },
  "baltmotors-700-efi": {
    "defaultColor": "green",
    "photos": [
      {
        "src": "/assets/products/striker-shared/striker-shared__black__01-front-right.webp",
        "alt": "baltmotors 700 efi — чёрный, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "black"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__camouflage__01-front-right.webp",
        "alt": "baltmotors 700 efi — камуфляж, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "camouflage"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__green__01-front-right.webp",
        "alt": "baltmotors 700 efi — зелёный, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "green"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__light-gray__01-front-right.webp",
        "alt": "baltmotors 700 efi — серый, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "gray"
      }
    ]
  },
  "baltmotors-700-efi-eps": {
    "defaultColor": "camouflage",
    "photos": [
      {
        "src": "/assets/products/striker-shared/striker-shared__black__01-front-right.webp",
        "alt": "baltmotors 700 efi eps — чёрный, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "black"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__camouflage__01-front-right.webp",
        "alt": "baltmotors 700 efi eps — камуфляж, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "camouflage"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__green__01-front-right.webp",
        "alt": "baltmotors 700 efi eps — зелёный, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "green"
      },
      {
        "src": "/assets/products/striker-shared/striker-shared__light-gray__01-front-right.webp",
        "alt": "baltmotors 700 efi eps — серый, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "gray"
      }
    ]
  },
  "mikilon-hammer-touring-200": {
    "defaultColor": "gray",
    "photos": [
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__blue__01-front-right.webp",
        "alt": "mikilon hammer touring 200 — синий, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__blue__02-front.webp",
        "alt": "mikilon hammer touring 200 — синий, вид спереди",
        "width": 1920,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__blue__03-front-left.webp",
        "alt": "mikilon hammer touring 200 — синий, вид спереди слева",
        "width": 1920,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__blue__04-left.webp",
        "alt": "mikilon hammer touring 200 — синий, вид слева",
        "width": 1920,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__blue__05-right.webp",
        "alt": "mikilon hammer touring 200 — синий, вид справа",
        "width": 1920,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__gray__01-front-right.webp",
        "alt": "mikilon hammer touring 200 — серый, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "gray"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__gray__02-front.webp",
        "alt": "mikilon hammer touring 200 — серый, вид спереди",
        "width": 1920,
        "height": 1920,
        "color": "gray"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__gray__03-left.webp",
        "alt": "mikilon hammer touring 200 — серый, вид слева",
        "width": 1920,
        "height": 1920,
        "color": "gray"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__gray__04-left-back.webp",
        "alt": "mikilon hammer touring 200 — серый, вид сзади слева",
        "width": 1920,
        "height": 1920,
        "color": "gray"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__gray__05-back.webp",
        "alt": "mikilon hammer touring 200 — серый, вид сзади",
        "width": 1920,
        "height": 1920,
        "color": "gray"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-200/hammer-200__gray__06-right-back.webp",
        "alt": "mikilon hammer touring 200 — серый, вид сзади справа",
        "width": 1920,
        "height": 1920,
        "color": "gray"
      }
    ]
  },
  "mikilon-hammer-touring-300": {
    "defaultColor": "blue",
    "photos": [
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__blue__01-front-right.webp",
        "alt": "mikilon hammer touring 300 — синий, вид спереди справа",
        "width": 1920,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__blue__02-front.webp",
        "alt": "mikilon hammer touring 300 — синий, вид спереди",
        "width": 1920,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__blue__03-front-left.webp",
        "alt": "mikilon hammer touring 300 — синий, вид спереди слева",
        "width": 1920,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__blue__04-left.webp",
        "alt": "mikilon hammer touring 300 — синий, вид слева",
        "width": 1920,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__blue__05-rear.webp",
        "alt": "mikilon hammer touring 300 — синий, вид сзади",
        "width": 1921,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__blue__06-right.webp",
        "alt": "mikilon hammer touring 300 — синий, вид справа",
        "width": 1920,
        "height": 1920,
        "color": "blue"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__yellow__01-front-right.webp",
        "alt": "mikilon hammer touring 300 — жёлтый, вид спереди справа",
        "width": 1921,
        "height": 1920,
        "color": "yellow"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__yellow__02-front.webp",
        "alt": "mikilon hammer touring 300 — жёлтый, вид спереди",
        "width": 1920,
        "height": 1920,
        "color": "yellow"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__yellow__03-front-left.webp",
        "alt": "mikilon hammer touring 300 — жёлтый, вид спереди слева",
        "width": 1920,
        "height": 1920,
        "color": "yellow"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__yellow__04-left.webp",
        "alt": "mikilon hammer touring 300 — жёлтый, вид слева",
        "width": 1920,
        "height": 1920,
        "color": "yellow"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__yellow__05-rear.webp",
        "alt": "mikilon hammer touring 300 — жёлтый, вид сзади",
        "width": 1920,
        "height": 1920,
        "color": "yellow"
      },
      {
        "src": "/assets/products/mikilon-hammer-touring-300/hammer-300__yellow__06-right.webp",
        "alt": "mikilon hammer touring 300 — жёлтый, вид справа",
        "width": 1921,
        "height": 1920,
        "color": "yellow"
      }
    ]
  }
};

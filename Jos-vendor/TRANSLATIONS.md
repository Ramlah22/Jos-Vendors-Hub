# Translation Setup Guide

## How to Use Translations in Your Components

### 1. Import useTranslation Hook
```jsx
import { useTranslation } from 'react-i18next';
```

### 2. Use in Your Component
```jsx
function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
    </div>
  );
}
```

## Translation Files Location
All translation files are in: `src/locales/`
- `en.json` - English
- `ha.json` - Hausa
- `yo.json` - Yoruba
- `ig.json` - Igbo

## Adding New Translations

1. Add the key and value to all language files in `src/locales/`

Example:
```json
{
  "header": {
    "login": "Login"
  }
}
```

2. Use in component:
```jsx
const { t } = useTranslation();
<button>{t('header.login')}</button>
```

## Supported Languages
- English (en)
- Hausa (ha)
- Yoruba (yo)
- Igbo (ig)

The language selector button appears in the top-right corner of the app and persists the selection in localStorage.

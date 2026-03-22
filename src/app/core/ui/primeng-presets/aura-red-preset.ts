import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const AuraRed = definePreset(Aura, {
  semantic: {
    primary: palette('{red}'),
  },
});

export default AuraRed;


import React from 'react';
import { TypographyService } from '../service/typographyService';
import { TypographyState } from '../types/typography.types';

export const useTypography = () => {
  const [state, setState] = React.useState<TypographyState>({
    fontFamilies: [],
  });

  const typographyService = React.useMemo(() => new TypographyService(), []);

  React.useEffect(() => {
    const fontFamilies = typographyService.getFontFamilies();
    setState(prev => ({ ...prev, fontFamilies }));
  }, [typographyService]);

  return {
    fontFamilies: state.fontFamilies,
  };
};

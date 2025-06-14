
import { TypographyRepository, ITypographyRepository } from '../repository/typographyRepository';
import { FontFamily } from '../types/typography.types';

export interface ITypographyService {
  getFontFamilies(): FontFamily[];
}

export class TypographyService implements ITypographyService {
  private repository: ITypographyRepository;

  constructor(repository: ITypographyRepository = new TypographyRepository()) {
    this.repository = repository;
  }

  getFontFamilies(): FontFamily[] {
    return this.repository.getFontFamilies();
  }
}

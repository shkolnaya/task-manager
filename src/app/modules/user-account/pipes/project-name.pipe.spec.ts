import { ProjectsService } from '../services/projects.service';
import { ProjectNamePipe } from './project-name.pipe';

describe('ProjectNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ProjectNamePipe({} as ProjectsService);
    expect(pipe).toBeTruthy();
  });
});

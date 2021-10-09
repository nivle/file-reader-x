import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReaderXComponent } from './file-reader-x.component';

describe('FileReaderXComponent', () => {
  let component: FileReaderXComponent;
  let fixture: ComponentFixture<FileReaderXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileReaderXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReaderXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

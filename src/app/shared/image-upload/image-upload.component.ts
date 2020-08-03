import {Component, Input} from '@angular/core';

import {ImageService} from '../../services/image.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  selectedFile: ImageSnippet;
  selectedFiles: ImageSnippet [];

  @Input() houseId: string;

  constructor(private imageService: ImageService) {
    this.selectedFiles = [];
  }

  processFile(imageInput: any) {
    const files: File[] = imageInput.files;
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(this.fileLoader(files[i]));
    }

    Promise.all(promises).then(value => {
      this.selectedFiles = value;
    });
  }

  submit() {
    const files = this.selectedFiles.map((f) => f.file);
    this.imageService.uploadImage(this.houseId, files).subscribe(
      (res) => {
        this.onSuccess();
      },
      (err) => {
        this.onError();
      });
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  private fileLoader(file: File): Promise<any> {
    return new Promise(((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        const imageSnippet = new ImageSnippet(event.target.result, file);
        imageSnippet.pending = true;
        resolve(imageSnippet);
      });

      reader.addEventListener('error', (event: any) => {
        reject(event);
      });

      if (file !== undefined) {
        reader.readAsDataURL(file);
      } else {
        reject(undefined);
      }

    }));
  }
}

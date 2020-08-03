import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ImageService } from '../../services/image.service';
import { AppCommonConstants } from '../../constants/common';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: [ './image-upload.component.scss' ]
})
export class ImageUploadComponent {

  /**
   * Selected image files
   */
  selectedFiles: ImageSnippet [];

  /**
   * Id of the house to which the images must be associated
   */
  @Input() houseId: string;

  /**
   * Event emitted after every image upload action
   */
  @Output() imageUploadingState: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Component's constructor
   * @param imageService Image service for image operations
   */
  constructor(private imageService: ImageService) {
    this.selectedFiles = [];
  }

  /**
   * On file input change
   * @param imageInput Image grabbed from file input
   */
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

  /**
   * On form submit
   */
  submit() {

    if (this.selectedFiles.length > 0) {
      const files = this.selectedFiles.map((f) => f.file);
      this.imageUploadingState.emit(AppCommonConstants.IMAGE_UPLOADING_STATE.UPLOADING);
      this.imageService.uploadImage(this.houseId, files).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        });
    }
  }

  /**
   * On successful image uploading
   */
  private onSuccess() {
    this.imageUploadingState.emit(AppCommonConstants.IMAGE_UPLOADING_STATE.UPLOADED);
    this.selectedFiles = [];
  }

  /**
   * On unsuccessful image uploading
   */
  private onError() {
    this.imageUploadingState.emit(AppCommonConstants.IMAGE_UPLOADING_STATE.ERROR_UPLOADING);
  }

  /**
   * File loader for image snippet
   * @param file File from which to grab image snippet
   */
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

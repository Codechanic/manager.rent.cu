import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"]
})
export class ImageUploadComponent {
  imageSrc: string;

  imageUploadForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    file: new FormControl("", [Validators.required]),
    fileSource: new FormControl("", [Validators.required])

  });

  constructor() {
  }

  get f(){
    return this.imageUploadForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.imageUploadForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  submit() {

  }
}

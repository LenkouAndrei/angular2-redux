import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {IAppStore} from "../app/app.store";
import {select, Store} from "@ngrx/store";
import {GetArticleFromDB} from "../fc-ngrx-store/fc-ngrx-database/fc-ngrx-database.actions";

@Component({
  selector: 'fc-edit-page',
  templateUrl: './fc-edit-page.html',
  styleUrls: ['./fc-edit-page.less'],
})
export class FcEditPageComponent implements OnInit, OnDestroy {
  private emptyFrom = {
    title: '',
    urlToImage: '',
    publishedAt: '',
    description: '',
    author: '',
    url: '',
  };

  public pageName: string;

  public editCreateForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormGroup({
      short: new FormControl('', [Validators.maxLength(50)]),
      full: new FormControl('', [Validators.required]),
    }),
    imageSrc: new FormControl('', [this.customUrlToImageValidetor()]),
    publishedAt: new FormControl('', [this.customDateValidator()]),
    creater: new FormControl(''),
    url: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppStore>,
  ) {}

  public ngOnInit(): void {
    this.store.pipe(select(state => state.databaseState.article))
      .subscribe(article => {
        const dataToForm = (article !== null) ? article : this.emptyFrom;
        this.setDataToForm(dataToForm);
      });
  }

  public saveAndLeavePage(): void {
    console.log('Saved!!!');
    this.onSubmit();
    this.router.navigate(['/articles']);
  }

  public onSubmit(): void {
    console.log('Submited!!! ', this.editCreateForm.value);
  }

  private customDateValidator(): ValidatorFn {
    const pattern: RegExp = /^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})/;
    return (control: AbstractControl): {[ key: string ]: any} => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : {custom: 'Incorrect date format. Assign as mm/dd/yyyy'};
      }
    };
  }

  private customUrlToImageValidetor(): ValidatorFn {
    const pattern: RegExp = /\.(?:jpg|gif|png)$/;
    return (control: AbstractControl): {[ key: string ]: any} => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : {custom: 'Incorrect image extension/ Next formats are available: .jpg .gif .png'};
      }
    };
  }

  private setDataToForm(data: any): void {
    this.editCreateForm.setValue({
      title: data.title,
      imageSrc: data.urlToImage,
      publishedAt: data.publishedAt,
      description: {
        short: '',
        full: data.description,
      },
      creater: data.author,
      url: data.url,
    });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new GetArticleFromDB(null));
  }
}

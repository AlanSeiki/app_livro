import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AutorInterface, AutorService } from "@autor";
import { AlertService } from "@services";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './livro-cadastro.component.html'
})
export class LivroCadastroComponent implements OnInit, OnDestroy {

    private URL_PATTERN: RegExp = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

    private anoAtualValidator: ValidatorFn = (control: AbstractControl<any, any>): ValidationErrors | null => {
        const anoAtual = new Date().getFullYear();
        if (control.value && control.value > anoAtual) {
            return { anoInvalido: true }
        }
        return null;
    }
    private autoresValidator: ValidatorFn = (control: AbstractControl<any, any>): ValidationErrors | null => {
        if (control.value?.length < 1) {
            return { autoresInvalido: true }
        }
        return null;
    }


    autores: AutorInterface[] = [];
    livroForm = new FormGroup({
        titulo: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        subtitulo: new FormControl(''),
        paginas: new FormControl(0, Validators.min(5)),
        isbn: new FormControl('', [
            Validators.minLength(10),
            Validators.maxLength(10)
        ]),
        editora: new FormControl('', Validators.required),
        ano: new FormControl(2000, [
            Validators.required,
            this.anoAtualValidator
        ]),
        url: new FormControl('http://', Validators.pattern(this.URL_PATTERN)),
        preco: new FormControl(0, Validators.min(0)),
        autores: new FormControl([], this.autoresValidator)
    });





    private subscriptions = new Subscription();

    constructor(
        private autorService: AutorService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.carregaAutores()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    carregaAutores() {
        const subscription = this.autorService.getAutores().subscribe(
            (autores) => {
                console.log(autores);
                this.autores = autores;
            },
            (error) => {
                console.error(error);
                this.alertService.error('Não foi possível carregar os autores. Tente novamente mais tarde')

            }
        )
        this.subscriptions.add(subscription);
    }

    compareWith(o1: AutorInterface, o2: AutorInterface) {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    }

    onSubmit() {
        console.log(this.livroForm.value);
    }
}
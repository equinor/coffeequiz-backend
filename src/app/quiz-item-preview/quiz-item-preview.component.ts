import {Component, Input, OnInit} from '@angular/core';
import {QuizItem} from "../quizitem";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
    selector: 'quiz-item-preview',
    templateUrl: './quiz-item-preview.component.html',
    styleUrls: ['./quiz-item-preview.component.css']
})
export class QuizItemPreviewComponent implements OnInit {

    @Input() imageId: string;
    @Input() quizItem: QuizItem;
    @Input() quizId: string;
    imageUrl: SafeUrl;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }

    // noinspection JSUnusedGlobalSymbols
    ngOnChanges() {
        this.imageUrl = this.sanitizer.bypassSecurityTrustStyle(`url(/api/quiz/file/${this.imageId})`);
    }

}

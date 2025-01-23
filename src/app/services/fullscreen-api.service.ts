import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FullscreenApiService {
    // @ts-ignore
  fullScreenStatus$: Observable<boolean>;

  // @ts-ignore
  private _fullScreenBackgroundElement: HTMLElement;
  // @ts-ignore
    private _fullScreenActiveSubject: BehaviorSubject<boolean>;

    get fullScreenBackgroundElement(): HTMLElement {
        return this._fullScreenBackgroundElement;
    }

    set fullScreenBackgroundElement(htmlElement: HTMLElement) {
        this._fullScreenBackgroundElement = htmlElement;
        this._fullScreenActiveSubject = new BehaviorSubject<boolean>(this.isFullScreenActive());
        this.fullScreenStatus$ = this._fullScreenActiveSubject.asObservable();
        this.setupDocumentEventListeners();
    }

    public openCloseFullScreen = (): void => {
        if (this.isFullScreenActive()) {
            this.tryCloseFullScreen();
        } else {
            this.tryOpenFullScreen();
        }
    };

    private setupDocumentEventListeners(): void {
        document.addEventListener('fullscreenchange', this.changeFullScreenActiveStatus);
        document.addEventListener('webkitfullscreenchange', this.changeFullScreenActiveStatus);
        document.addEventListener('mozfullscreenchange', this.changeFullScreenActiveStatus);
        document.addEventListener('MSFullscreenChange', this.changeFullScreenActiveStatus);
    }

    private changeFullScreenActiveStatus = () => {
        this._fullScreenActiveSubject.next(!this._fullScreenActiveSubject.value);
    };

    private isFullScreenActive(): boolean {
        return (
            window.innerHeight === screen.height ||
            (this.fullScreenBackgroundElement && window.innerWidth === this.fullScreenBackgroundElement.offsetWidth)
        );
    }

    private tryOpenFullScreen = (): void => {
        // Conditions below must stay because of browser setup
        if (this.fullScreenBackgroundElement.requestFullscreen) {
            this.fullScreenBackgroundElement.requestFullscreen();
        } else {
            this.fullScreenBackgroundElement.requestFullscreen();
        }
    };

    private tryCloseFullScreen = (): void => {
        // Conditions below must stay because of browser setup
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else {
            document.exitFullscreen();
        }
    };
}

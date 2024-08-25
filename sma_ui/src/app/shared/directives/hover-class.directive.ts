import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[hover-class]'
})
export class HoverClass {

    @Input('onLeave') onLeaveClass: any;
    @Input('onEnter') onEnterClass: any;
    private hasMouseEntered: boolean = false;

    constructor(public elementRef: ElementRef) {

    }

    @HostListener('click') onMouseEnter(): void {
        if (!this.hasMouseEntered) {
            this.hasMouseEntered = true;
            this.updateClass();
        } else {
            this.hasMouseEntered = false;
            this.updateClass();
        }
    }

    private updateClass(): void {
        if (this.hasMouseEntered) {
            this.elementRef.nativeElement.classList.remove(this.onLeaveClass);
            this.elementRef.nativeElement.classList.add(this.onEnterClass);
        } else {
            this.elementRef.nativeElement.classList.remove(this.onEnterClass);
            this.elementRef.nativeElement.classList.add(this.onLeaveClass);
        }
    }
}
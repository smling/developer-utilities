import { ClipBoardHelper } from "../../utilities/ClipBoardHelper.js";
import { Random } from "../../utilities/Random.js";

export class Base64SerializerComponent {
    constructor() {
        const random = new Random();
        this.componentId = random.generateRandomString(8);
        this.clipBoardHelper = new ClipBoardHelper();
    }
    render(elementId) {
        fetch("src/components/base64-serializer/base64-serializer-component.html")
            .then(response => response.text())
            .then(templateHtml => {
                templateHtml = templateHtml.replace(/base64-value/g, `base64-value-${this.componentId}`);
                templateHtml = templateHtml.replace(/base64-copy/g, `base64-copy-${this.componentId}`);
                templateHtml = templateHtml.replace(/base64-encode/g, `base64-encode-${this.componentId}`);
                templateHtml = templateHtml.replace(/base64-decode/g, `base64-decode-${this.componentId}`);
                return templateHtml;
            })
            .then(templateHtml => {
                const element = document.getElementById(elementId);
                element.innerHTML = templateHtml;

                this.base64ValueElement = element.querySelector(`#base64-value-${this.componentId}`);
                this.base64CopyElement = element.querySelector(`#base64-copy-${this.componentId}`);
                this.base64EncodeElement = element.querySelector(`#base64-encode-${this.componentId}`);
                this.base64DecodeElement = element.querySelector(`#base64-decode-${this.componentId}`);

                this.base64CopyElement.addEventListener("click", () => {
                    this.clipBoardHelper.copyToClipboard(this.base64ValueElement.value);
                });

                this.base64EncodeElement.addEventListener("click", () => {
                    const value = this.encode(this.base64ValueElement.value);
                    this.base64ValueElement.value = value;
                });

                this.base64DecodeElement.addEventListener("click", () => {
                    const value = this.decode(this.base64ValueElement.value);
                    this.base64ValueElement.value = value;
                });
            });
    }
    
    encode(value) {
        return btoa(value);
    }

    decode(value) {
        return atob(value);
    }
}
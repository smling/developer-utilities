import { ClipBoardHelper } from "../../utilities/ClipBoardHelper.js";
import { Random } from "../../utilities/Random.js";

export class UUIDGeneratorComponent {
    constructor() {
        const random = new Random();
        this.componentId = random.generateRandomString(8);
        this.clipBoardHelper = new ClipBoardHelper();
    }
    render(elementId) {
        fetch("src/components/uuid-generator/uuid-generator-component.html")
            .then(response => response.text())
            .then(templateHtml => {
                templateHtml = templateHtml.replace(/uuid-form/g, `uuid-form-${this.componentId}`);
                templateHtml = templateHtml.replace(/uuid-input/g, `uuid-input-${this.componentId}`);
                templateHtml = templateHtml.replace(/uuid-generate/g, `uuid-generate-${this.componentId}`);
                templateHtml = templateHtml.replace(/uuid-copy/g, `uuid-copy-${this.componentId}`);
                return templateHtml;
            })
            .then(templateHtml => {
                const element = document.getElementById(elementId);
                element.innerHTML = templateHtml;
                this.uuidFormElement = element.querySelector(`#uuid-form-${this.componentId}`);
                this.uuidInputElement = element.querySelector(`#uuid-input-${this.componentId}`);
                this.uuidGeneratorElement = element.querySelector(`#uuid-generate-${this.componentId}`);
                this.uuidCopyElement = element.querySelector(`#uuid-copy-${this.componentId}`);

                this.uuidGeneratorElement.addEventListener("click", () => {
                    console.debug("clicked");
                    const uuid = this.generateUUID();
                    this.uuidInputElement.value = uuid;
                });
                this.uuidInputElement.addEventListener("input", (event) => {
                    console.debug("changed");
                    let validationMessage = "";
                    if(!this.isValidUUID(event.target.value)) {
                        event.target.classList.add("is-invalid");
                    } else {
                        event.target.classList.remove("is-invalid");
                    }
                });

                this.uuidCopyElement.addEventListener("click", () => {
                    this.clipBoardHelper.copyToClipboard(this.uuidInputElement.value);
                });
            })
            .catch(error => console.error("Error occurred when render template.", error));
    }

    generateUUID() {
        const randomHex = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return randomHex;
    } 

    isValidUUID(uuid) {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        return uuidPattern.test(uuid);
    }
}
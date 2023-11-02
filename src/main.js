import { Base64SerializerComponent } from "./components/base64-serializer/base64-serializer-component.js";
import { UUIDGeneratorComponent } from "./components/uuid-generator/uuid-generator-component.js";

document.addEventListener("DOMContentLoaded", () => {
    const uuidGeneratorComponent = new UUIDGeneratorComponent();
    uuidGeneratorComponent.render("uuid-generator");
    const base64SerializerComponent = new Base64SerializerComponent();
    base64SerializerComponent.render("base64-serializer");
});
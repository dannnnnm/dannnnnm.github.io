import { POSITION_COMPONENT, RENDER_COMPONENT } from "../components/constants.js";
import { BaseSystem } from "./baseSystem.js";

export class RenderSystem extends BaseSystem{
    constructor(componentManager,config={},logger){
        super(componentManager,logger)

    }

    update(){
        this.componentManager.getComponentsByTypes(RENDER_COMPONENT,POSITION_COMPONENT).forEach(entityComponents => {
            const renderComponent = entityComponents[RENDER_COMPONENT];
            const positionComponent = entityComponents[POSITION_COMPONENT];
            renderComponent.htmlElement().style.top=positionComponent.y+"px"
            renderComponent.htmlElement().style.left=positionComponent.x+"px"
        });
    }
    
}
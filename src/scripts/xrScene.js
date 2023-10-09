import {
    Engine,
    Scene,
    WebXRDomOverlay,
    WebXREnterExitUIButton,
    WebXRState,
} from "@babylonjs/core";

let createScene = async (canvas, domOverlayElement, enterXRButton) => {
    let engine = new Engine(canvas);
    let scene = new Scene(engine);

    // const enterXRButton = new WebXREnterExitUIButton(
    //     enterXRButton.$el,
    //     'immersive-ar',
    //     'unbounded'
    // )

    let xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: 'immersive-ar',
            referenceSpaceType: 'unbounded',
            //customButtons: [enterXRButton]
        }
    });
    console.log("XR: ", xr);

    const domOverlay = xr.baseExperience.featuresManager.enableFeature(
        WebXRDomOverlay,
        "latest",
        {
            element: domOverlayElement.$el
        }
    );

    xr.baseExperience.onStateChangedObservable.add((state) => {
        if(state == WebXRState.ENTERING_XR) {
            window.dispatchEvent(new CustomEvent('enter-xr'));
        }
    })

    engine.runRenderLoop(() => {
        scene.render();
    })
}

export { createScene }
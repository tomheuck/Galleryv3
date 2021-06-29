import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Vector4 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { BoxBuilder } from "@babylonjs/core/Meshes/Builders/boxBuilder";
import { GroundBuilder } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { CylinderBuilder } from "@babylonjs/core/Meshes/Builders/cylinderBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import {CreateSceneClass} from "../createScene";
//import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
//import { AudioEngine } from "@babylonjs/core/Audio/audioEngine";
//import { Sound } from "@babylonjs/core/Audio/sound";
//import 'babylonjs-loaders';

// If you don't need the standard material you will still need to import it since the scene requires it.
// import "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import grassTextureUrl from "../../assets/grass.jpg";
import boxTextureUrl from "../../assets/semihouse_T.png";
import roofTextureUrl from "../../assets/roof_Tv2.jpg";

export class DefaultSceneWithTexture implements CreateSceneClass {

    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);
    
        // This creates and positions a free camera (non-mesh)
        const camera = new ArcRotateCamera(
            "my first camera",
            -Math.PI / 2.5,
            Math.PI / 3,
            10,
            new Vector3(0, 0, 0),
            scene
        );
    
        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());
    
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
    
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;


        const buildGround = () => {
            const ground = GroundBuilder.CreateGround(
                "ground",
                { width: 6, height: 6 },
                scene
            );
        
            // Load a texture to be used as the ground material
            const groundMaterial = new StandardMaterial("ground material", scene);
            groundMaterial.diffuseTexture = new Texture(grassTextureUrl, scene);
        
            ground.material = groundMaterial;
    
        }

        const buildBox = () => {
            const boxMat = new StandardMaterial("box material", scene);
        boxMat.diffuseTexture = new Texture(boxTextureUrl, scene);
        const faceUV = [];
        faceUV[0] = new Vector4(0.6, 0.0, 1.0, 1.0);
        faceUV[1] = new Vector4(0.0, 0.0, 0.4, 1.0);
        faceUV[2] = new Vector4(0.4, 0, 0.6, 1.0);
        faceUV[3] = new Vector4(0.4, 0, 0.6, 1.0); 
        
        const box = BoxBuilder.CreateBox(
            "box",
            { width: 2, faceUV: faceUV, wrap: true}
        );

        box.material = boxMat;
        box.position.y = 0.5;

        return box;
        }

        //const playMusic = () => {
        //    const newSong = new Sound("Eno2", "../../assets/Eno2.mp3", scene, null, {loop: true, autoplay: true});
        //}


        const buildRoof = () => {
            const roofMat = new StandardMaterial("roof material", scene);
            roofMat.diffuseTexture = new Texture(roofTextureUrl, scene);
            const roof = CylinderBuilder.CreateCylinder(
                "roof",
                { diameter: 1.3, height: 1.2, tessellation: 3 }, scene
            );
    
            roof.material = roofMat;
            roof.scaling.x = 0.75;
            roof.scaling.y = 2;
            roof.rotation.z = Math.PI / 2;
            roof.position.y = 1.22;
    
            return roof;
        }
        
        const roof = buildRoof();
        const ground = buildGround();
        const box = buildBox();
        //const tunes = playMusic();

        // Our built-in 'ground' shape.
    
        return scene;
    };
}

export default new DefaultSceneWithTexture();
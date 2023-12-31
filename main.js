import * as THREE from './three/three.module.js';
import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js'
import { OrbitControls } from './three/OrbitControls.js'
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js'
// import { BinaryLoader } from 'https://cdn.skypack.dev/three@110.0.1/examples/jsm/loaders/BinaryLoader.js'

// define constants for properties
const constants = {

    combine: {

        'THREE.MultiplyOperation': THREE.MultiplyOperation,
        'THREE.MixOperation': THREE.MixOperation,
        'THREE.AddOperation': THREE.AddOperation

    },

    side: {

        'THREE.FrontSide': THREE.FrontSide,
        'THREE.BackSide': THREE.BackSide,
        'THREE.DoubleSide': THREE.DoubleSide

    },

    blendingMode: {

        'THREE.NoBlending': THREE.NoBlending,
        'THREE.NormalBlending': THREE.NormalBlending,
        'THREE.AdditiveBlending': THREE.AdditiveBlending,
        'THREE.SubtractiveBlending': THREE.SubtractiveBlending,
        'THREE.MultiplyBlending': THREE.MultiplyBlending,
        'THREE.CustomBlending': THREE.CustomBlending

    },

    equations: {

        'THREE.AddEquation': THREE.AddEquation,
        'THREE.SubtractEquation': THREE.SubtractEquation,
        'THREE.ReverseSubtractEquation': THREE.ReverseSubtractEquation

    },

    destinationFactors: {

        'THREE.ZeroFactor': THREE.ZeroFactor,
        'THREE.OneFactor': THREE.OneFactor,
        'THREE.SrcColorFactor': THREE.SrcColorFactor,
        'THREE.OneMinusSrcColorFactor': THREE.OneMinusSrcColorFactor,
        'THREE.SrcAlphaFactor': THREE.SrcAlphaFactor,
        'THREE.OneMinusSrcAlphaFactor': THREE.OneMinusSrcAlphaFactor,
        'THREE.DstAlphaFactor': THREE.DstAlphaFactor,
        'THREE.OneMinusDstAlphaFactor': THREE.OneMinusDstAlphaFactor

    },

    sourceFactors: {

        'THREE.DstColorFactor': THREE.DstColorFactor,
        'THREE.OneMinusDstColorFactor': THREE.OneMinusDstColorFactor,
        'THREE.SrcAlphaSaturateFactor': THREE.SrcAlphaSaturateFactor

    },

    models: {
        'BasicModels': './assets/models/perry/skull_downloadable.glb',
        'DepthModels': './assets/models/perry/skull_downloadable.glb',
        'NormalModels': './assets/models/perry/skull_downloadable.glb',
        'LambertModels': '',
        'PhongModels': "./assets/models/helmet/DamagedHelmet.gltf",
        'StandardModels': './assets/models/perry/LeePerrySmith.glb',
        'PhysicalModels': './assets/models/shelf/shelf.glb'

    }

};

// get object keys
function getObjectsKeys(obj) {

    const keys = [];

    for (const key in obj) {

        if (obj.hasOwnProperty(key)) {

            keys.push(key);

        }

    }

    return keys;

}

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// set up environment maps
const envMaps = (function () {

    const path = './assets/texture/cube/royal_castle/';
    const format = '.jpg';
    const urls = [
        path + 'px' + format, path + 'nx' + format, path + 'py' + format, 
        path + 'ny' + format, path + 'pz' + format, path + 'nz' + format
    ];

    const reflectionCube = cubeTextureLoader.load(urls);

    const refractionCube = cubeTextureLoader.load(urls);
    refractionCube.mapping = THREE.CubeRefractionMapping;

    return {
        none: null,
        reflection: reflectionCube,
        refraction: refractionCube
    };

})();

// set diffuse maps
const diffuseMaps = (function () {

    const bricks = textureLoader.load('/assets/texture/brick_diffuse.jpg');
    bricks.wrapS = THREE.RepeatWrapping;
    bricks.wrapT = THREE.RepeatWrapping;
    bricks.repeat.set(9, 1);

    const bricks2 = textureLoader.load('/assets/texture/brick_diffuse2.jpg');
    bricks2.wrapS = THREE.RepeatWrapping;
    bricks2.wrapT = THREE.RepeatWrapping;
    bricks2.repeat.set(9, 1);

    const bricks3 = textureLoader.load('/assets/texture/brick_diffuse3.jpg');
    bricks3.wrapS = THREE.RepeatWrapping;
    bricks3.wrapT = THREE.RepeatWrapping;
    bricks3.repeat.set(9, 1);

    return {
        none: null,
        bricks: bricks,
        bricks2: bricks2,
        bricks3: bricks3
    };

})();

// set bump maps
const bumpMaps = (function () {

    const bricks = textureLoader.load('/assets/texture/brick_roughness.jpg');
    bricks.wrapS = THREE.RepeatWrapping;
    bricks.wrapT = THREE.RepeatWrapping;
    bricks.repeat.set(9, 1);
    const bricks2 = textureLoader.load('/assets/texture/brick_bump.jpg');
    bricks2.wrapS = THREE.RepeatWrapping;
    bricks2.wrapT = THREE.RepeatWrapping;
    bricks2.repeat.set(9, 1);
    const bricks3 = textureLoader.load('/assets/texture/brick_bump_2.jpg');
    bricks3.wrapS = THREE.RepeatWrapping;
    bricks3.wrapT = THREE.RepeatWrapping;
    bricks3.repeat.set(9, 1);
    const bricks4 = textureLoader.load('/assets/texture/hardwood2_bump.jpg');
    bricks4.wrapS = THREE.RepeatWrapping;
    bricks4.wrapT = THREE.RepeatWrapping;
    bricks4.repeat.set(9, 1);
    const bricks5 = textureLoader.load('/assets/texture/hardwood2_roughness.jpg');
    bricks5.wrapS = THREE.RepeatWrapping;
    bricks5.wrapT = THREE.RepeatWrapping;
    bricks5.repeat.set(9, 1);
    const bricks6 = textureLoader.load('/assets/texture/displacement_4.png');
    bricks6.wrapS = THREE.RepeatWrapping;
    bricks6.wrapT = THREE.RepeatWrapping;
    bricks6.repeat.set(9, 1);

    const perry = textureLoader.load('./assets/models/perry/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg');
    perry.wrapS = THREE.RepeatWrapping;
    perry.wrapT = THREE.RepeatWrapping;
    perry.repeat.set(9, 1);

    // console.log(bricks)

    return {
        none: null,
        bricks_bump1: bricks,
        bricks_bump2: bricks2,
        bricks_bump3: bricks3,
        bricks_bump4: bricks4,
        bricks_bump5: bricks5,
        bricks_bump6: bricks6,
        perry: perry

    };

})();

// set normal maps
const normalMaps = (function () {

    const bricks = textureLoader.load('/assets/texture/brick_normal.png');
    bricks.wrapS = THREE.RepeatWrapping;
    bricks.wrapT = THREE.RepeatWrapping;
    bricks.repeat.set(9, 1);


    const bricks2 = textureLoader.load('/assets/texture/normal2.png');
    bricks2.wrapS = THREE.RepeatWrapping;
    bricks2.wrapT = THREE.RepeatWrapping;
    bricks2.repeat.set(9, 1);

    const bricks3 = textureLoader.load('/assets/texture/normal_3.png');
    bricks3.wrapS = THREE.RepeatWrapping;
    bricks3.wrapT = THREE.RepeatWrapping;
    bricks3.repeat.set(9, 1);

    const perry = textureLoader.load('/assets/models/perry/Infinite-Level_02_Tangent_SmoothUV.jpg');
    perry.wrapS = THREE.RepeatWrapping;
    perry.wrapT = THREE.RepeatWrapping;
    perry.repeat.set(9, 1);


    return {
        none: null,
        bricks_normal1: bricks,
        bricks_normal2: bricks2,
        bricks_normal3: bricks3,
        perry: perry
    };

})();

// set displacement maps
const displacementMaps = (function () {

    const bricks = textureLoader.load('/assets/texture/brick_displacement.png');
    bricks.wrapS = THREE.RepeatWrapping;
    bricks.wrapT = THREE.RepeatWrapping;
    bricks.repeat.set(9, 1);

    const bricks2 = textureLoader.load('/assets/texture/displacement_2.png');
    bricks2.wrapS = THREE.RepeatWrapping;
    bricks2.wrapT = THREE.RepeatWrapping;
    bricks2.repeat.set(9, 1);

    const bricks3 = textureLoader.load('/assets/texture/displacement_3.png');
    bricks3.wrapS = THREE.RepeatWrapping;
    bricks3.wrapT = THREE.RepeatWrapping;
    bricks3.repeat.set(9, 1);

    const bricks4 = textureLoader.load('/assets/texture/displacement_4.png');
    bricks4.wrapS = THREE.RepeatWrapping;
    bricks4.wrapT = THREE.RepeatWrapping;
    bricks4.repeat.set(9, 1);

    const perry = textureLoader.load('./assets/models/perry/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg');
    perry.wrapS = THREE.RepeatWrapping;
    perry.wrapT = THREE.RepeatWrapping;
    perry.repeat.set(9, 1);

    return {
        none: null,
        bricks_displacement1: bricks,
        bricks_displacement2: bricks2,
        bricks_displacement3: bricks3,
        bricks_displacement4: bricks4,
        perry: perry
    };

})();

// set ao maps
const aoMaps = (function () {

    const bricks = textureLoader.load('/assets/texture/brick_ao.png');
    bricks.wrapS = THREE.RepeatWrapping;
    bricks.wrapT = THREE.RepeatWrapping;
    bricks.repeat.set(9, 1);


    const bricks2 = textureLoader.load('/assets/texture/aoMap2.png');
    bricks2.wrapS = THREE.RepeatWrapping;
    bricks2.wrapT = THREE.RepeatWrapping;
    bricks2.repeat.set(9, 1);

    const bricks3 = textureLoader.load('/assets/texture/aoMap3.png');
    bricks3.wrapS = THREE.RepeatWrapping;
    bricks3.wrapT = THREE.RepeatWrapping;
    bricks3.repeat.set(9, 1);

    return {
        none: null,
        bricks_ao: bricks,
        bricks_ao2: bricks2,
        bricks_ao3: bricks3
    };

})();

// set roughness maps
const roughnessMaps = (function () {

    const bricks = textureLoader.load('./assets/texture/brick_roughness.jpg');
    bricks.wrapT = THREE.RepeatWrapping;
    bricks.wrapS = THREE.RepeatWrapping;
    bricks.repeat.set(9, 1);
    const bricks3 = textureLoader.load('./assets/texture/roughness_3.jpg');
    bricks3.wrapT = THREE.RepeatWrapping;
    bricks3.wrapS = THREE.RepeatWrapping;
    bricks3.repeat.set(9, 1);
    const bricks2 = textureLoader.load('./assets/texture/hardwood2_roughness.jpg');
    bricks2.wrapT = THREE.RepeatWrapping;
    bricks2.wrapS = THREE.RepeatWrapping;
    bricks2.repeat.set(9, 1);

    const bricks4 = textureLoader.load('./assets/texture/roughness_4.jpg');
    bricks4.wrapT = THREE.RepeatWrapping;
    bricks4.wrapS = THREE.RepeatWrapping;
    bricks4.repeat.set(9, 1);

    return {
        none: null,
        bricks: bricks,
        bricks2: bricks2,
        bricks3: bricks3,
        bricks4: bricks4
    };

})();

const matcaps = (function () {

    return {
        none: null,
        porcelainWhite: textureLoader.load('./assets/texture/matcaps/matcap-porcelain-white.jpg')
    };

})();

// set alpha maps
const alphaMaps = (function () {

    const fibers = textureLoader.load('./assets/texture/alphaMap.jpg');
    fibers.wrapT = THREE.RepeatWrapping;
    fibers.wrapS = THREE.RepeatWrapping;
    fibers.repeat.set(9, 1);

    return {
        none: null,
        fibers: fibers
    };

})();

//set gradient maps
const gradientMaps = (function () {

    const threeTone = textureLoader.load('./assets/texture/gradientMaps/threeTone.jpg');
    threeTone.minFilter = THREE.NearestFilter;
    threeTone.magFilter = THREE.NearestFilter;

    const fiveTone = textureLoader.load('./assets/texture/gradientMaps/fiveTone.jpg');
    fiveTone.minFilter = THREE.NearestFilter;
    fiveTone.magFilter = THREE.NearestFilter;

    return {
        none: null,
        threeTone: threeTone,
        fiveTone: fiveTone
    };

})();

const envMapKeys = getObjectsKeys(envMaps);
const envMapKeysPBR = envMapKeys.slice(0, 2);
const diffuseMapKeys = getObjectsKeys(diffuseMaps);
const bumpMapKeys = getObjectsKeys(bumpMaps);
const normalMapKeys = getObjectsKeys(normalMaps);
const displacementMapKeys = getObjectsKeys(displacementMaps);
const aoMapKeys = getObjectsKeys(aoMaps)
const roughnessMapKeys = getObjectsKeys(roughnessMaps);
const matcapKeys = getObjectsKeys(matcaps);
const alphaMapKeys = getObjectsKeys(alphaMaps);
const gradientMapKeys = getObjectsKeys(gradientMaps);

function generateVertexColors(geometry) {

    const positionAttribute = geometry.attributes.position;

    const colors = [];
    const color = new THREE.Color();

    for (let i = 0, il = positionAttribute.count; i < il; i++) {

        color.setHSL(i / il * Math.random(), 0.5, 0.5);
        colors.push(color.r, color.g, color.b);

    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

}

function handleColorChange(color) {

    return function (value) {

        if (typeof value === 'string') {

            value = value.replace('#', '0x');

        }

        color.setHex(value);

    };

}

function needsUpdate(material, geometry) {

    return function () {

        material.side = parseInt(material.side); //Ensure number
        material.needsUpdate = true;
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.normal.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;

    };

}

function updateCombine(material) {

    return function (combine) {

        material.combine = parseInt(combine);
        material.needsUpdate = true;

    };

}

function updateTexture(material, materialKey, textures) {

    return function (key) {
        material[materialKey] = textures[key];
        material.needsUpdate = true;
        console.log(material.normalMap)
    };

}

// set scene gui
function guiScene(gui, scene) {

    const folder = gui.addFolder('Scene');

    const data = {
        background: '#000000',
        'ambient light': ambientLight.color.getHex()
    };

    folder.addColor(data, 'ambient light').onChange(handleColorChange(ambientLight.color));

    guiSceneFog(folder, scene);

}

// set fog scene
function guiSceneFog(folder, scene) {

    const fogFolder = folder.addFolder('scene.fog');

    const fog = new THREE.Fog(0x3f7b9d, 0, 60);

    const data = {
        fog: {
            'THREE.Fog()': false,
            'scene.fog.color': fog.color.getHex()
        }
    };

    fogFolder.add(data.fog, 'THREE.Fog()').onChange(function (useFog) {

        if (useFog) {

            scene.fog = fog;

        } else {

            scene.fog = null;

        }

    });

    fogFolder.addColor(data.fog, 'scene.fog.color').onChange(handleColorChange(fog.color));

}

// set gui for material
function guiMaterial(gui, material, geometry) {

    const folder = gui.addFolder('THREE.Material');

    folder.add(material, 'transparent').onChange(needsUpdate(material, geometry));
    folder.add(material, 'opacity', 0, 1).step(0.01);

    folder.add(material, 'depthTest');
    folder.add(material, 'depthWrite');
    // folder.add( material, 'polygonOffset' );
    // folder.add( material, 'polygonOffsetFactor' );
    // folder.add( material, 'polygonOffsetUnits' );
    folder.add(material, 'alphaTest', 0, 1).step(0.01).onChange(needsUpdate(material, geometry));
    folder.add(material, 'alphaHash').onChange(needsUpdate(material, geometry));
    folder.add(material, 'visible');
    folder.add(material, 'side', constants.side).onChange(needsUpdate(material, geometry));

}

// set gui for meshbasicmaterial
function guiMeshBasicMaterial(gui, material, geometry) {

    const data = {
        color: material.color.getHex(),
        envMaps: envMapKeys[0],
        map: diffuseMapKeys[0],
        alphaMap: alphaMapKeys[0],
        aoMap: aoMapKeys[0]
    };

    const folder = gui.addFolder('THREE.MeshBasicMaterial');

    folder.addColor(data, 'color').onChange(handleColorChange(material.color));
    folder.add(material, 'wireframe');
    folder.add(material, 'vertexColors').onChange(needsUpdate(material, geometry));
    folder.add(material, 'fog').onChange(needsUpdate(material, geometry));

    folder.add(data, 'envMaps', envMapKeys).onChange(updateTexture(material, 'envMap', envMaps));
    folder.add(data, 'map', diffuseMapKeys).onChange(updateTexture(material, 'map', diffuseMaps));
    folder.add(data, 'alphaMap', alphaMapKeys).onChange(updateTexture(material, 'alphaMap', alphaMaps));
    folder.add(data, 'aoMap', aoMapKeys).onChange(updateTexture(material, 'aoMap', aoMaps));
    folder.add(material, 'combine', constants.combine).onChange(updateCombine(material));
    folder.add(material, 'reflectivity', 0, 1);
    folder.add(material, 'refractionRatio', 0, 1);

}

// set gui for meshdepthmaterial
function guiMeshDepthMaterial(gui, material) {

    const data = {
        alphaMap: alphaMapKeys[0]
    };

    const folder = gui.addFolder('THREE.MeshDepthMaterial');

    folder.add(material, 'wireframe');

    folder.add(data, 'alphaMap', alphaMapKeys).onChange(updateTexture(material, 'alphaMap', alphaMaps));
    // folder.add(data, 'd', envMapKeys).onChange(updateTexture(material, 'envMap', envMaps));

}

// set gui for meshnormalmaterial
function guiMeshNormalMaterial(gui, material, geometry) {
    const data = {
        bumpMaps: bumpMapKeys[0],
        normalMaps: normalMapKeys[0]
    };


    const folder = gui.addFolder('THREE.MeshNormalMaterial');

    folder.add(material, 'flatShading').onChange(needsUpdate(material, geometry));
    folder.add(material, 'wireframe');
    folder.add(data, 'bumpMap', bumpMapKeys).onChange(updateTexture(material, 'bumpMap', bumpMaps));
    folder.add(data, 'normalMap', normalMapKeys).onChange(updateTexture(material, 'normalMap', normalMaps));

}


// set gui for meshlambertmaterial
function guiMeshLambertMaterial(gui, material, geometry) {

    const data = {
        color: material.color.getHex(),
        emissive: material.emissive.getHex(),
        envMap: envMapKeys[0],
        bumpMap: bumpMapKeys[0],
        normalMap: normalMapKeys[0],
        displacementMap: displacementMapKeys[0],
        aoMap: aoMapKeys[0],
        map: diffuseMapKeys[0],
        alphaMap: alphaMapKeys[0]
    };

    const folder = gui.addFolder('THREE.MeshLambertMaterial');

    folder.addColor(data, 'color').onChange(handleColorChange(material.color));
    folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive));

    folder.add(material, 'wireframe');
    folder.add(material, 'flatShading').onChange(needsUpdate(material, geometry));
    folder.add(material, 'vertexColors').onChange(needsUpdate(material, geometry));
    folder.add(material, 'fog').onChange(needsUpdate(material, geometry));

    folder.add(data, 'envMaps', envMapKeys).onChange(updateTexture(material, 'envMap', envMaps));
    folder.add(data, 'bumpMap', bumpMapKeys).onChange(updateTexture(material, 'bumpMap', bumpMaps));
    folder.add(material, 'bumpScale', 0, 1);
    folder.add(data, 'normalMap', normalMapKeys).onChange(updateTexture(material, 'normalMap', normalMaps));
    folder.add(data, 'displacementMap', displacementMapKeys).onChange(updateTexture(material, 'displacementMap', displacementMaps));
    folder.add(material, 'displacementScale', 0, 1);
    folder.add(data, 'aoMap', aoMapKeys).onChange(updateTexture(material, 'aoMap', aoMaps));
    folder.add(data, 'map', diffuseMapKeys).onChange(updateTexture(material, 'map', diffuseMaps));
    folder.add(data, 'alphaMap', alphaMapKeys).onChange(updateTexture(material, 'alphaMap', alphaMaps));
    folder.add(material, 'combine', constants.combine).onChange(updateCombine(material));
    folder.add(material, 'reflectivity', 0, 1);
    folder.add(material, 'refractionRatio', 0, 1);

}

// set gui for meshphongmaterial
function guiMeshPhongMaterial(gui, material, geometry) {

    const data = {
        color: material.color.getHex(),
        emissive: material.emissive.getHex(),
        specular: material.specular.getHex(),
        envMaps: envMapKeys[0],
        map: diffuseMapKeys[0],
        alphaMap: alphaMapKeys[0]
    };

    const folder = gui.addFolder('THREE.MeshPhongMaterial');

    folder.addColor(data, 'color').onChange(handleColorChange(material.color));
    folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive));
    folder.addColor(data, 'specular').onChange(handleColorChange(material.specular));

    folder.add(material, 'shininess', 0, 150);
    folder.add(material, 'flatShading').onChange(needsUpdate(material, geometry));
    folder.add(material, 'wireframe');
    folder.add(material, 'vertexColors').onChange(needsUpdate(material, geometry));
    folder.add(material, 'fog').onChange(needsUpdate(material, geometry));
    folder.add(data, 'envMaps', envMapKeys).onChange(updateTexture(material, 'envMap', envMaps));
    folder.add(data, 'map', diffuseMapKeys).onChange(updateTexture(material, 'map', diffuseMaps));
    folder.add(data, 'alphaMap', alphaMapKeys).onChange(updateTexture(material, 'alphaMap', alphaMaps));
    folder.add(material, 'combine', constants.combine).onChange(updateCombine(material));
    folder.add(material, 'reflectivity', 0, 1);
    folder.add(material, 'refractionRatio', 0, 1);

}

// set gui for meshstandardmaterial
function guiMeshStandardMaterial(gui, material, geometry) {

    const data = {
        color: material.color.getHex(),
        emissive: material.emissive.getHex(),
        envMaps: envMapKeysPBR[0],
        map: diffuseMapKeys[0],
        roughnessMap: roughnessMapKeys[0],
        alphaMap: alphaMapKeys[0],
        metalnessMap: alphaMapKeys[0]
    };

    const folder = gui.addFolder('THREE.MeshStandardMaterial');

    folder.addColor(data, 'color').onChange(handleColorChange(material.color));
    folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive));

    folder.add(material, 'roughness', 0, 1);
    folder.add(material, 'metalness', 0, 1);
    folder.add(material, 'flatShading').onChange(needsUpdate(material, geometry));
    folder.add(material, 'wireframe');
    folder.add(material, 'vertexColors').onChange(needsUpdate(material, geometry));
    folder.add(material, 'fog').onChange(needsUpdate(material, geometry));
    folder.add(data, 'envMaps', envMapKeysPBR).onChange(updateTexture(material, 'envMap', envMaps));
    folder.add(data, 'map', diffuseMapKeys).onChange(updateTexture(material, 'map', diffuseMaps));
    folder.add(data, 'roughnessMap', roughnessMapKeys).onChange(updateTexture(material, 'roughnessMap', roughnessMaps));
    folder.add(data, 'alphaMap', alphaMapKeys).onChange(updateTexture(material, 'alphaMap', alphaMaps));
    folder.add(data, 'metalnessMap', alphaMapKeys).onChange(updateTexture(material, 'metalnessMap', alphaMaps));

}

// set gui for meshphysicalmaterial
function guiMeshPhysicalMaterial(gui, material, geometry) {

    const data = {
        color: material.color.getHex(),
        emissive: material.emissive.getHex(),
        envMaps: envMapKeys[0],
        map: diffuseMapKeys[0],
        roughnessMap: roughnessMapKeys[0],
        alphaMap: alphaMapKeys[0],
        metalnessMap: alphaMapKeys[0],
        sheenColor: material.sheenColor.getHex(),
        specularColor: material.specularColor.getHex(),
        iridescenceMap: alphaMapKeys[0]
    };

    const folder = gui.addFolder('THREE.MeshPhysicalMaterial');

    folder.addColor(data, 'color').onChange(handleColorChange(material.color));
    folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive));

    folder.add(material, 'roughness', 0, 1);
    folder.add(material, 'metalness', 0, 1);
    folder.add(material, 'ior', 1, 2.333);
    folder.add(material, 'reflectivity', 0, 1);
    folder.add(material, 'iridescence', 0, 1);
    folder.add(material, 'iridescenceIOR', 1, 2.333);
    folder.add(material, 'sheen', 0, 1);
    folder.add(material, 'sheenRoughness', 0, 1);
    folder.addColor(data, 'sheenColor').onChange(handleColorChange(material.sheenColor));
    folder.add(material, 'clearcoat', 0, 1).step(0.01);
    folder.add(material, 'clearcoatRoughness', 0, 1).step(0.01);
    folder.add(material, 'specularIntensity', 0, 1);
    folder.addColor(data, 'specularColor').onChange(handleColorChange(material.specularColor));
    folder.add(material, 'flatShading').onChange(needsUpdate(material, geometry));
    folder.add(material, 'wireframe');
    folder.add(material, 'vertexColors').onChange(needsUpdate(material, geometry));
    folder.add(material, 'fog').onChange(needsUpdate(material, geometry));
    folder.add(data, 'envMaps', envMapKeysPBR).onChange(updateTexture(material, 'envMap', envMaps));
    folder.add(data, 'map', diffuseMapKeys).onChange(updateTexture(material, 'map', diffuseMaps));
    folder.add(data, 'roughnessMap', roughnessMapKeys).onChange(updateTexture(material, 'roughnessMap', roughnessMaps));
    folder.add(data, 'alphaMap', alphaMapKeys).onChange(updateTexture(material, 'alphaMap', alphaMaps));
    folder.add(data, 'metalnessMap', alphaMapKeys).onChange(updateTexture(material, 'metalnessMap', alphaMaps));
    folder.add(data, 'iridescenceMap', alphaMapKeys).onChange(updateTexture(material, 'iridescenceMap', alphaMaps));

}

// choose gui material
function chooseFromHash(gui, url, geometry) {

    const selectedMaterial = window.location.hash.substring(1) || 'MeshBasicMaterial';

    let material;

    switch (selectedMaterial) {

        case 'MeshBasicMaterial':

            material = new THREE.MeshBasicMaterial({ color: 0x049EF4 });
            guiMaterial(gui, material, geometry);
            guiMeshBasicMaterial(gui, material, geometry);
            url = constants['models'].BasicModels

            return { material, url };

            break;

        case 'MeshLambertMaterial':

            material = new THREE.MeshLambertMaterial({ color: 0x049EF4 });
            guiMaterial(gui, material, geometry);
            guiMeshLambertMaterial(gui, material, geometry);
            url = constants['models'].LambertModels

            return { material, url };;

            break;

        case 'MeshPhongMaterial':

            material = new THREE.MeshPhongMaterial({ color: 0x049EF4, specular: 0x969696 });
            guiMaterial(gui, material, geometry);
            guiMeshPhongMaterial(gui, material, geometry);
            url = constants['models'].PhongModels
            return { material, url };;

            break;

        case 'MeshStandardMaterial':

            material = new THREE.MeshStandardMaterial({ color: 0x049EF4 });
            guiMaterial(gui, material, geometry);
            guiMeshStandardMaterial(gui, material, geometry);
            url = constants['models'].StandardModels

            // only use scene environment

            light1.visible = false;
            light2.visible = false;
            light3.visible = false;

            return { material, url };;

            break;

        case 'MeshPhysicalMaterial':

            material = new THREE.MeshPhysicalMaterial({ color: 0x049EF4 });
            guiMaterial(gui, material, geometry);
            guiMeshPhysicalMaterial(gui, material, geometry);
            url = constants['models'].PhysicalModels

            // only use scene environment

            light1.visible = false;
            light2.visible = false;
            light3.visible = false;

            return { material, url };;

            break;

        case 'MeshDepthMaterial':

            material = new THREE.MeshDepthMaterial();
            guiMaterial(gui, material, geometry);
            guiMeshDepthMaterial(gui, material);
            url = constants['models'].DepthModels

            return { material, url };;

            break;

        case 'MeshNormalMaterial':

            material = new THREE.MeshNormalMaterial();
            guiMaterial(gui, material, geometry);
            guiMeshNormalMaterial(gui, material, geometry);
            url = constants['models'].NormalModels

            return { material, url };;

            break;
    }

}

//

const selectedMaterial = window.location.hash.substring(1);

if (THREE[selectedMaterial] === undefined) {

    console.log("No selected material")

}

const gui = new GUI();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// set generator for environment maps
const pmremGenerator = new THREE.PMREMGenerator(renderer);

const path = './assets/texture/cube/royal_castle/';
const format = '.jpg';
const urls = [
    path + 'px' + format, path + 'nx' + format,
    path + 'py' + format, path + 'ny' + format,
    path + 'pz' + format, path + 'nz' + format
];

const cubeBackground = cubeTextureLoader.load(urls);

// set scene
const scene = new THREE.Scene();
scene.background = cubeBackground;
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

// set camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 10, 100);
camera.position.z = 35;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI;


// set light
const ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

const light1 = new THREE.DirectionalLight(0xffffff, 3);
light1.position.set(0, 200, 0);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 3);
light2.position.set(200, 0, 0);
scene.add(light2);

const light3 = new THREE.DirectionalLight(0xffffff, 3);
light3.position.set(- 100, - 200, - 100);
scene.add(light3);

guiScene(gui, scene);

// create geometry
const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 32).toNonIndexed();
// const geometry = new THREE.SphereGeometry(10, 10, 10);
geometry.attributes.uv2 = geometry.attributes.uv;

generateVertexColors(geometry);

let url = ""

// create material
const result = chooseFromHash(gui, url, geometry);
const material = result['material']

url = result['url']
// console.log(url)

let prevFog = false;

if (url === "") {
    // add geometry
    const mesh = new THREE.Mesh(geometry)
    mesh.material = material
    scene.add(mesh)
    render_geo(mesh)
} else {
    const gltfLoader = new GLTFLoader();
    const gltf = await gltfLoader.loadAsync(url);
    const model = gltf.scene

    // add model
    model.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    model.scale.set(10, 10, 10);
    scene.add(model)
    render()
}




// use geometry
function render_geo(mesh) {

	requestAnimationFrame(render);

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.005;
	controls.update();

	if (prevFog !== scene.fog) {

		mesh.material.needsUpdate = true;
		prevFog = scene.fog;

	}

	renderer.render(scene, camera);

}

// use model
function render() {

    requestAnimationFrame(render);
    controls.update();

    if (prevFog !== scene.fog) {
        prevFog = scene.fog;

    }

    renderer.render(scene, camera);

}

window.addEventListener('resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}, false);
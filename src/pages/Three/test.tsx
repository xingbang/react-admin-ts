import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import helvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';

const Three: React.FC = () => {
  useEffect(() => {
    // 创建场景对象Scene
    const scene = new THREE.Scene();

    // 创建几何体
    // const geometry = new THREE.BoxGeometry(100, 100, 100);
    // 创建球形几何体
    // const geometry = new THREE.SphereGeometry(50, 50, 50);

    // 材质对象
    // const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    // 网络模型对象Mesh
    // const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(100, 100, 100);
    // 将模型添加到场景中
    // scene.add(mesh);

    // object
    // const group = new THREE.Group();
    // scene.add(group);
    // const cubel = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    // group.add(cubel);

    /**
     * fonts
     */
    const fontLoader = new FontLoader();
    const font = fontLoader.parse(helvetikerFont);
    if (font) {
      const textGeometry = new TextGeometry('Hello Three', {
        font: font,
        size: 0.5,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });
      const textMaterial = new THREE.MeshBasicMaterial();
      const text = new THREE.Mesh(textGeometry, textMaterial);
      scene.add(text);
    }

    // Axes
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    // 相机设置
    // 透视相机对象
    const camera = new THREE.PerspectiveCamera(120, 1000 / 400, 1, 1000);
    // 设置相机位置
    camera.position.set(2, 2, 2);
    // 设置相机对象（指向场景对象）
    camera.lookAt(scene.position);
    scene.add(camera);

    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染区域尺寸
    renderer.setSize(1000, 400);
    // 设置背景颜色
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('three')?.appendChild(renderer.domElement);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const render = () => {
      controls.update();
      // 执行渲染操作（场景，相机）
      renderer.render(scene, camera);
      window.requestAnimationFrame(render); //请求再次执行渲染函数render
    };

    render();
  }, []);

  return <div id="three"></div>;
};

export default Three;

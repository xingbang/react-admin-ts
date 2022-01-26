import React, { useEffect } from 'react';
import * as THREE from 'three';

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
    const group = new THREE.Group();
    scene.add(group);
    const cubel = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    group.add(cubel);

    // Axes
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    // 相机设置
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(scene.position);
    scene.add(camera);

    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染区域尺寸
    renderer.setSize(400, 400);
    // 设置背景颜色
    renderer.setClearColor(0xb9d3ff, 1);
    document.getElementById('three')?.appendChild(renderer.domElement);
    // 执行渲染操作（场景，相机）
    renderer.render(scene, camera);
  }, []);

  return <div id="three"></div>;
};

export default Three;

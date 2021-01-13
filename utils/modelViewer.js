/* eslint-disable */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
import { MtlObjBridge } from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

// import { makeTextSprite } from './modelConfig.js'
class ModelView {
  constructor () {
    this._container = null
    this._camera = null
    this._light = null
    this._clock = null
    this._scene = null
    this._renderer = null
    this._orbitControls = null
    this._transformControl = null
  }

  _initScene (dom) {
    console.log('dom',dom)
    const container = (this._container = dom)
    const scene = (this._scene = new THREE.Scene())
    // default camera
    const camera = (this._camera = new THREE.PerspectiveCamera(
      45,
      container.offsetWidth / container.offsetHeight,
      0.01,
      10000
    ))
    scene.add(camera)

    // renderer
    const renderer = (this._renderer = new THREE.WebGLRenderer({
      // 执行抗锯齿
      antialias: true,
      // 使用对数深度缓存
      logarithmicDepthBuffer: true
    }))
    // 设置颜色及其透明度
    renderer.setClearColor(0x222222)
    // 设置设备像素比
    renderer.setPixelRatio(window.devicePixelRatio)
    // 将输出canvas的大小调整为(width, height)并考虑设备像素比，且将视口从(0, 0)开始调整到适合大小
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    container.appendChild(renderer.domElement)
    // default orbitControls
    const orbitControls = (this._orbitControls = new OrbitControls(
      this._camera,
      renderer.domElement
    ))
    orbitControls.update()
    // default light
    const light = new THREE.AmbientLight(0x404040)
    scene.add(light)
  }

  _initModel (model) {
    const mtlLoader = new MTLLoader()
    mtlLoader.load(model.mtl, mtlParseResult => {
      const objLoader = new OBJLoader2()
      const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult)
      // 遍历所有材质，设置成双面
      try {
        materials.Material.side = THREE.DoubleSide
      } catch {
        for (const material of Object.values(materials)) {
          material.side = THREE.DoubleSide
        }
      }

      objLoader.addMaterials(materials)
      objLoader.load(
        model.obj,
        this._loadSuccess.bind(this),
        this._loadProgress.bind(this),
        this._onError.bind(this)
      )
    })
  }

  _loadSuccess (root) {
    // const rootGroup = new THREE.Group()
    // rootGroup.name = 'rootGroup'
    console.log('root', root)
    root.name = 'activeModel'
    root.traverse(function (item) {
      if (item instanceof THREE.Mesh) {
        item.castShadow = true
        item.receiveShadow = true
      }
    })

    const orbitControls = this._orbitControls
    const camera = this._camera
    const scene = this._scene
    const cameraPos = new THREE.Vector3(-0.2, 0.4, 1.4)
    root.updateMatrixWorld()
    // 获取model尺寸
    const boundingBox = new THREE.Box3().setFromObject(root)
    const modelSizeVec3 = new THREE.Vector3()
    boundingBox.getSize(modelSizeVec3)
    const modelSize = modelSizeVec3.length()
    const modelCenter = new THREE.Vector3()
    boundingBox.getCenter(modelCenter)
    console.log('modelSize', modelSize)
    console.log('modelCenter', modelCenter)
    // 放置模型位置
    root.position.x = -modelCenter.x
    root.position.y = -modelCenter.y
    root.position.z = -modelCenter.z
    // 更新 orbitControls
    orbitControls.reset()
    orbitControls.maxDistance = modelSize * 50
    orbitControls.enableDamping = true
    orbitControls.dampingFactor = 0.07
    orbitControls.rotateSpeed = 0.25
    orbitControls.panSpeed = 0.25
    orbitControls.target.copy(modelCenter)
    orbitControls.update()

    // orbitControls.screenSpacePanning = true
    // 更新 相机位置
    root.position.x = -modelCenter.x
    root.position.y = -modelCenter.y
    root.position.z = -modelCenter.z
    camera.position.copy(modelCenter)
    camera.position.x += modelSize * cameraPos.x
    camera.position.y += modelSize * cameraPos.y
    camera.position.z += modelSize * cameraPos.z
    camera.near = modelSize / 100
    camera.far = modelSize * 100
    camera.updateProjectionMatrix()
    camera.lookAt(modelCenter)

    scene.add(root)
    this._animate()
  }

  _loadProgress () {}
  _onError () {}
  _animate () {
    const orbitControls = this._orbitControls
    orbitControls.update()
    this._renderer.render(this._scene, this._camera)
    requestAnimationFrame(this._animate.bind(this))
  }

  _initControl () {}
  _onWindowResize () {
    this._camera.aspect =
      this._container.offsetWidth / this._container.offsetHeight
    this._camera.updateProjectionMatrix()

    this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight)
  }

  init (modelInfo) {
    const { dom, model } = modelInfo
    this._initScene(dom)
    this._initModel(model)
  }
}

export default ModelView

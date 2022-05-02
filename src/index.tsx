import React from 'react'
import {
  SkinViewer,
  createOrbitControls,
  WalkingAnimation,
  RotatingAnimation
} from 'skinview3d'

export const defaultProps = {
  walk: false,
  control: true,
  rotate: false
}

export type MinecraftSkinViewerProps = {
  skin: string
  width: number
  height: number
  walk: boolean
  rotate: boolean
  control: boolean
  zoom: boolean
  background: String
} & typeof defaultProps

export const MinecraftSkinViewer = ({
  skin,
  width,
  height,
  walk,
  rotate,
  control,
  zoom,
  background
}: MinecraftSkinViewerProps) => {
  const canvas = React.useRef<HTMLCanvasElement>(null)

  React.useLayoutEffect(() => {
    const skinViewer = new SkinViewer({
      skin,
      width,
      height,
      canvas: canvas.current as HTMLCanvasElement
    })

    // View control
    let viewerControl: any

    if (background === 'transparent') {
      skinViewer.renderer.setClearColor(0xffffff, 0)
    } else {
      // @ts-ignore
      skinViewer.background = background
    }

    if (control) {
      viewerControl = createOrbitControls(skinViewer)
      viewerControl.enablePan = false
      viewerControl.enableZoom = zoom
      viewerControl.enableRotate = true
    }

    // Animations
    if (walk) {
      skinViewer.animations.add(WalkingAnimation)
    }
    if (rotate) {
      skinViewer.animations.add(RotatingAnimation)
    }
    // const rotate = skinViewer.animations.add(skinview3d.RotatingAnimation);
    // const run = skinViewer.animations.add(skinview3d.RunningAnimation);
    // Set the speed of an animation
    // run.speed = 3;
    // Pause single animation
    // run.paused = true;
    // Pause all animations!
    // skinViewer.animations.paused = true;

    return () => {
      if (control) {
        viewerControl.dispose()
      }

      skinViewer.dispose()
    }
  }, [skin, width, height, control, walk, background])

  return <canvas ref={canvas} />
}

MinecraftSkinViewer.defaultProps = defaultProps

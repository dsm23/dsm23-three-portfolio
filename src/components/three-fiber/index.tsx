"use client";

import { Suspense } from "react";
import type { FunctionComponent } from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { CanvasProps } from "@react-three/fiber";
import Scene from "~/components/scene";

type Props = Pick<CanvasProps, "nonce">;

const ThreeFiber: FunctionComponent<Props> = ({ nonce }) => (
  <>
    <Suspense fallback={null}>
      <Canvas
        className="canvas"
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [-3, 1.5, 4],
        }}
        nonce={nonce}
      >
        <Scene />
      </Canvas>
    </Suspense>
    <Loader />
  </>
);

export default ThreeFiber;

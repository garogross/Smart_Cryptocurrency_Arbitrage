import React, {useEffect, useState} from 'react';
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {particlesOptions} from "../../../utils/particlesOptions";
import { loadSlim } from "@tsparticles/slim";
import styles from "./particlesBg.module.scss"

function ParticlesBg(props) {
    const [init, setInit] = useState(false);


    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);


    return (
        <>
            {
                init &&
                <Particles
                id="tsparticles"
                className={styles['particlesBg']}
                options={particlesOptions}
            />
            }
        </>
    );
}

export default ParticlesBg;
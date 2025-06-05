const appData = {
    gasoline: {
        welcome: `
            <div class="text-center bg-white p-6 rounded-xl shadow-md">
                <h2 class="text-2xl font-bold text-slate-900 mb-2">Gasoline Engine Diagnostics</h2>
                <p class="text-slate-600">For gasoline engines, the vacuum gauge is a powerful tool for diagnosing internal engine health. Start by selecting how your gauge is behaving at idle after the engine is fully warmed up.</p>
            </div>`,
        symptoms: {
            steadyNormal: {
                label: 'Steady & Normal',
                content: `
                    <div class="grid md:grid-cols-2 gap-8 items-start">
                        <div class="bg-white p-6 rounded-xl shadow-md">
                            <h3 class="text-xl font-bold mb-4 text-slate-900">Normal Engine Behavior</h3>
                            <div class="space-y-4 text-slate-600">
                                <p>A healthy, warm engine at idle should show a <strong class="text-slate-800">steady vacuum of 17-22 in. Hg</strong> at sea level. This indicates good, uniform sealing across all cylinders.</p>
                                <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                    <h4 class="font-semibold text-blue-800">Altitude Correction</h4>
                                    <p class="text-blue-700 text-sm">Vacuum drops about 1 in. Hg for every 1000 ft of elevation. Adjust your baseline accordingly.</p>
                                    <div class="mt-2 flex items-center gap-2">
                                        <input type="number" id="altitude-input" placeholder="Enter altitude (ft)" class="w-full p-2 border border-slate-300 rounded-md text-sm">
                                        <button id="altitude-btn" class="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-semibold">Update</button>
                                    </div>
                                    <p id="altitude-result" class="mt-2 text-sm font-semibold text-blue-800"></p>
                                </div>
                                <p>During a sharp acceleration (a "snap test"), the needle should drop near 0, then swing high (to 24-25 in. Hg) before settling back to normal. This indicates healthy piston rings.</p>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow-md">
                            <div class="chart-container">
                                <canvas id="gauge-canvas"></canvas>
                            </div>
                        </div>
                    </div>`
            },
            steadyLow: {
                label: 'Steady & Low',
                content: `
                    <div class="grid md:grid-cols-2 gap-8 items-start">
                        <div class="bg-white p-6 rounded-xl shadow-md">
                            <h3 class="text-xl font-bold mb-4 text-slate-900">Steady, Low Vacuum</h3>
                            <p class="text-slate-600 mb-4">A steady but low reading usually points to a problem affecting all cylinders equally. Click a range to see likely causes.</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <button class="sub-symptom-btn flex-grow bg-slate-200 hover:bg-blue-600 hover:text-white transition-colors p-2 rounded-md text-sm font-medium" data-sub="low_5_10">5-10 in. Hg</button>
                                <button class="sub-symptom-btn flex-grow bg-slate-200 hover:bg-blue-600 hover:text-white transition-colors p-2 rounded-md text-sm font-medium" data-sub="low_10_15">10-15 in. Hg</button>
                                <button class="sub-symptom-btn flex-grow bg-slate-200 hover:bg-blue-600 hover:text-white transition-colors p-2 rounded-md text-sm font-medium" data-sub="low_15_18">15-18 in. Hg</button>
                            </div>
                            <div id="sub-symptom-content" class="bg-slate-50 p-4 rounded-lg min-h-[150px]"></div>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow-md">
                            <div class="chart-container">
                                <canvas id="gauge-canvas"></canvas>
                            </div>
                        </div>
                    </div>`
            },
            fluctuating: {
                label: 'Fluctuating Needle',
                content: `
                    <div class="grid md:grid-cols-2 gap-8 items-start">
                        <div class="bg-white p-6 rounded-xl shadow-md">
                            <h3 class="text-xl font-bold mb-4 text-slate-900">Fluctuating Needle</h3>
                            <p class="text-slate-600 mb-4">A bouncing or moving needle usually points to a problem in one or a few cylinders. Click a behavior to see the diagnosis.</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <button class="sub-symptom-btn flex-grow bg-slate-200 hover:bg-blue-600 hover:text-white transition-colors p-2 rounded-md text-sm font-medium" data-sub="fluct_rhythmicDrop">Rhythmic Drop</button>
                                <button class="sub-symptom-btn flex-grow bg-slate-200 hover:bg-blue-600 hover:text-white transition-colors p-2 rounded-md text-sm font-medium" data-sub="fluct_rapidFlutter">Rapid Flutter @ Idle</button>
                                <button class="sub-symptom-btn flex-grow bg-slate-200 hover:bg-blue-600 hover:text-white transition-colors p-2 rounded-md text-sm font-medium" data-sub="fluct_slowSweep">Slow Sweep</button>
                            </div>
                            <div id="sub-symptom-content" class="bg-slate-50 p-4 rounded-lg min-h-[150px]"></div>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow-md">
                            <div class="chart-container">
                                <canvas id="gauge-canvas"></canvas>
                            </div>
                        </div>
                    </div>`
            },
            other: {
                label: 'Other Behaviors',
                content: `
                    <div class="grid md:grid-cols-2 gap-8 items-start">
                        <div class="bg-white p-6 rounded-xl shadow-md">
                            <h3 class="text-xl font-bold mb-4 text-slate-900">Other Behaviors</h3>
                            <p class="text-slate-600 mb-4">Certain gauge behaviors point to specific, non-idle related issues. Click a behavior to learn more.</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <button class="sub-symptom-btn flex-grow bg-slate-200 hover:bg-blue-600 hover:text-white transition-colors p-2 rounded-md text-sm font-medium" data-sub="other_high">Steady & High</button>
                                <button class="sub-symptom-btn flex-grow bg-slate-200 hover:bg-blue-600 hover:text-white transition-colors p-2 rounded-md text-sm font-medium" data-sub="other_exhaust">Drops on Acceleration</button>
                            </div>
                            <div id="sub-symptom-content" class="bg-slate-50 p-4 rounded-lg min-h-[150px]"></div>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow-md">
                            <div class="chart-container">
                                <canvas id="gauge-canvas"></canvas>
                            </div>
                        </div>
                    </div>`
            }
        },
        subSymptoms: {
            low_5_10: {
                title: 'Cause: Significant Vacuum Leak',
                desc: 'Unmetered air is entering the intake, diluting the vacuum. The engine struggles to pull a strong vacuum against the leak.',
                next: 'Perform a smoke test or use propane/carb cleaner to find leaks at the intake manifold gasket, throttle body, or cracked hoses.'
            },
            low_10_15: {
                title: 'Cause: Late Valve Timing / Worn Rings',
                desc: 'If valves open/close too late, pumping efficiency is lost. Severely worn rings also fail to seal, reducing the ability to draw vacuum.',
                next: 'Check mechanical timing marks. Perform dry and wet compression tests to check for worn rings.'
            },

            low_15_18: {
                title: 'Cause: Retarded Ignition Timing',
                desc: 'When spark occurs too late, combustion is inefficient, leading to lower power and weaker vacuum pull.',
                next: 'Check and adjust ignition timing using a timing light according to manufacturer specs.'
            },
            fluct_rhythmicDrop: {
                title: 'Cause: Burnt or Leaking Valve',
                desc: 'A faulty valve fails to seal on its cycle, causing a momentary, regular vacuum loss.',
                next: 'Perform a cylinder power balance test, followed by compression and leak-down tests on the suspect cylinder.'
            },
            fluct_rapidFlutter: {
                title: 'Cause: Worn Valve Guides',
                desc: 'Excessive clearance in valve guides allows air to be drawn past the stems at idle, causing inconsistent cylinder filling.',
                next: 'Often accompanied by oil consumption. Perform a leak-down test and listen for air escaping. May require head removal to confirm.'
            },
            fluct_slowSweep: {
                title: 'Cause: Incorrect Air/Fuel Mixture',
                desc: 'A rich or lean mixture causes inconsistent combustion and slight variations in engine speed, showing as a slow drift.',
                next: 'Check fuel trims with a scan tool. Look for minor vacuum leaks or issues with fuel injectors or O2 sensors.'
            },
            other_high: {
                title: 'Cause: Overly Advanced Ignition Timing',
                desc: 'Advanced timing can make the engine pull harder against a closed throttle, creating higher than normal vacuum.',
                next: 'Check for a clogged air filter first. Then, check and adjust ignition timing. Excessively advanced timing can cause engine knock.'
            },
            other_exhaust: {
                title: 'Cause: Exhaust Restriction',
                desc: 'If the needle drops steadily as RPMs are held and fails to rise when the throttle is closed, it points to exhaust backpressure.',
                next: 'Perform an exhaust backpressure test. The likely culprit is a clogged catalytic converter or muffler.'
            }
        }
    },
    diesel: {
        welcome: `
            <div class="text-center bg-white p-6 rounded-xl shadow-md">
                <h2 class="text-2xl font-bold text-slate-900 mb-2">Diesel Engine Diagnostics</h2>
                <p class="text-slate-600">Diesel engines use a dedicated vacuum pump for accessories. Diagnostics focus on testing the pump and the components it serves. Select the system you are troubleshooting.</p>
            </div>`,
        symptoms: {
            pump: {
                label: 'Vacuum Pump',
                content: `
                    <div class="bg-white p-6 rounded-xl shadow-md">
                        <h3 class="text-xl font-bold mb-2 text-slate-900">Testing the Vacuum Pump</h3>
                        <p class="text-slate-600 mb-4">The vacuum pump is the heart of a diesel's vacuum system. If multiple vacuum-operated accessories are failing, the pump is the first place to check.</p>
                        <div class="space-y-4 text-slate-700">
                            <div>
                                <h4 class="font-semibold text-slate-800">1. Visual Inspection</h4>
                                <p>Check the pump and main supply lines for cracks, kinks, or loose fittings.</p>
                            </div>
                            <div>
                                <h4 class="font-semibold text-slate-800">2. Pump Output Test</h4>
                                <ul class="list-disc list-inside space-y-1 pl-2">
                                    <li>Disconnect the main vacuum line from the pump outlet.</li>
                                    <li>Connect your gauge directly to the pump's outlet port.</li>
                                    <li>Start the engine (for mechanical pumps) or turn ignition on (for electric pumps).</li>
                                </ul>
                            </div>
                            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                <h4 class="font-semibold text-green-800">Expected Reading</h4>
                                <p class="text-green-700">A healthy pump should produce a <strong class="text-green-900">strong, steady vacuum, typically 21-22 in. Hg or higher</strong>.</p>
                            </div>
                            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                <h4 class="font-semibold text-red-800">Low or Zero Reading?</h4>
                                <p class="text-red-700">If the reading is low, erratic, or zero, the pump itself is likely faulty. Also check the pump's drive mechanism (belt) or electrical connections.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            brake: {
                label: 'Brake Booster',
                content: `
                     <div class="bg-white p-6 rounded-xl shadow-md">
                        <h3 class="text-xl font-bold mb-2 text-slate-900">Diagnosing Brake Booster Problems</h3>
                        <p class="text-slate-600 mb-4">Common symptoms include a hard brake pedal and increased stopping distance.</p>
                        <div class="space-y-4 text-slate-700">
                            <div>
                                <h4 class="font-semibold text-slate-800">1. Functional Check</h4>
                                <p>With engine off, pump brakes to deplete vacuum. Hold pedal down and start engine. Pedal should drop slightly if booster is working.</p>
                            </div>
                            <div>
                                <h4 class="font-semibold text-slate-800">2. Vacuum Supply Test</h4>
                                <p>Connect gauge to the hose at the booster. It should show strong, steady vacuum (18-22+ in. Hg) from the pump.</p>
                            </div>
                            <div>
                                <h4 class="font-semibold text-slate-800">3. Booster Diaphragm & Check Valve Test</h4>
                                <p>Apply vacuum to the booster's inlet port with a hand pump. It must hold vacuum. The one-way check valve in the line should only allow air to flow towards the pump.</p>
                            </div>
                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                <h4 class="font-semibold text-yellow-800">Key Distinction</h4>
                                <p class="text-yellow-700">No vacuum <strong class="text-yellow-900">TO</strong> the booster means a pump/line issue. Booster not <strong class="text-yellow-900">HOLDING</strong> vacuum means a faulty booster diaphragm.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            hvac: {
                label: 'HVAC Controls',
                content: `
                    <div class="bg-white p-6 rounded-xl shadow-md">
                        <h3 class="text-xl font-bold mb-2 text-slate-900">Diagnosing HVAC Control Issues</h3>
                        <p class="text-slate-600 mb-4">Symptoms include air stuck on defrost or being unable to select vents.</p>
                        <div class="space-y-4 text-slate-700">
                            <div>
                                <h4 class="font-semibold text-slate-800">1. Check Supply to HVAC System</h4>
                                <p>Locate the main vacuum line to the control head under the dash. "Tee" in your gauge to verify a steady vacuum supply.</p>
                            </div>
                            <div>
                                <h4 class="font-semibold text-slate-800">2. Test Individual Actuators</h4>
                                <p>The system uses multiple small actuators ("pods") to move doors. Test each by applying vacuum with a hand pump. It should move and hold vacuum.</p>
                            </div>
                            <div>
                                <h4 class="font-semibold text-slate-800">3. Inspect Lines & Reservoir</h4>
                                <p>Check all small plastic lines for cracks or breaks. Test the vacuum reservoir (a small plastic sphere or can) and its check valve for leaks.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            turbo: {
                label: 'Turbo Actuator (VGT)',
                content: `
                   <div class="bg-white p-6 rounded-xl shadow-md">
                        <h3 class="text-xl font-bold mb-2 text-slate-900">Diagnosing VGT Turbo Actuator Faults</h3>
                        <p class="text-slate-600 mb-4">Symptoms include low/high boost, erratic performance, and boost-related fault codes.</p>
                        <div class="space-y-4 text-slate-700">
                            <div>
                                <h4 class="font-semibold text-slate-800">1. Actuator Seal & Movement Test (Engine Off)</h4>
                                <p>Connect a hand pump to the actuator. Apply vacuum. The rod should start moving at 3-5 in. Hg and reach full travel by 18+ in. Hg. It must hold vacuum and move smoothly.</p>
                                 <p class="text-sm mt-1 text-slate-500">A "crunchy" or binding rod suggests soot buildup in the turbo itself, not a vacuum issue.</p>
                            </div>
                            <div>
                                <h4 class="font-semibold text-slate-800">2. Check Control Solenoid (N75 Valve)</h4>
                                <p>This solenoid, controlled by the ECU, modulates vacuum to the actuator. Verify it's receiving vacuum from the pump and sending it to the actuator when commanded.</p>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    },
    modals: {
        safety: `
            <div class="space-y-3">
                <p><strong>Eye Protection:</strong> Always wear safety glasses.</p>
                <p><strong>Moving Parts:</strong> Keep hands, loose clothing, and tools clear of the fan, belts, and pulleys.</p>
                <p><strong>Vehicle Secured:</strong> Ensure the vehicle is in Park/Neutral with the parking brake on.</p>
                <p><strong>Hot Components:</strong> Be aware of the hot exhaust manifold and other engine parts.</p>
                <p><strong>Flammable Substances:</strong> Use extreme caution with propane or carb cleaner for leak detection due to fire risk.</p>
                <p><strong>Modern Electronics:</strong> Disconnecting vacuum lines on OBD-II vehicles may set trouble codes. Be prepared to clear them with a scan tool.</p>
            </div>`,
        leaks: `
            <div class="space-y-3">
                <p><strong>Visual Inspection:</strong> Always start by looking for obvious cracks, breaks, or disconnected hoses.</p>
                <p><strong>Listen for Hissing:</strong> A significant leak often makes an audible sucking sound.</p>
                <p><strong>Propane/Carb Cleaner Test (Gasoline):</strong> Carefully direct a small amount of an unlit flammable substance at suspected leak points. A change in engine RPM indicates a leak.</p>
                <p><strong>Smoke Test:</strong> The most effective method. A smoke machine fills the system with visible smoke, which will escape from any leak point.</p>
                <p><strong>Pinching Hoses (Diesel Accessories):</strong> Systematically pinch off accessory lines to isolate a leaking circuit or component.</p>
            </div>`
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const gasBtn = document.getElementById('gas-btn');
    const dieselBtn = document.getElementById('diesel-btn');
    const contentArea = document.getElementById('content-area');
    let currentEngineType = 'gasoline';
    let gaugeChart = null;
    let animationFrameId = null;

    function init() {
        loadContent(currentEngineType);
        gasBtn.classList.add('active');
        setupModal('safety');
        setupModal('leaks');
    }

    function loadContent(engineType) {
        currentEngineType = engineType;
        
        contentArea.innerHTML = appData[engineType].welcome;
        
        const symptomContainer = document.createElement('div');
        symptomContainer.className = 'grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto';
        
        Object.keys(appData[engineType].symptoms).forEach(key => {
            if (key !== 'welcome') {
                const symptom = appData[engineType].symptoms[key];
                const button = document.createElement('button');
                button.textContent = symptom.label;
                button.className = 'symptom-button bg-white shadow-sm p-3 rounded-lg font-semibold text-slate-700 hover:bg-blue-500 hover:text-white transition-colors text-center';
                button.dataset.symptom = key;
                symptomContainer.appendChild(button);
            }
        });

        contentArea.appendChild(symptomContainer);
        const detailContainer = document.createElement('div');
        detailContainer.id = 'symptom-detail';
        detailContainer.className = 'mt-8';
        contentArea.appendChild(detailContainer);

        addSymptomButtonListeners();
        
        // Load default symptom view
        const firstSymptom = Object.keys(appData[engineType].symptoms)[0];
        if (document.querySelector(`[data-symptom='${firstSymptom}']`)) {
            document.querySelector(`[data-symptom='${firstSymptom}']`).click();
        }
    }

    function addSymptomButtonListeners() {
        document.querySelectorAll('.symptom-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const symptomKey = e.target.dataset.symptom;
                document.querySelectorAll('.symptom-button').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                loadSymptomDetail(symptomKey);
            });
        });
    }

    function loadSymptomDetail(symptomKey) {
        const symptomDetail = document.getElementById('symptom-detail');
        if (!symptomDetail) return;

        symptomDetail.innerHTML = appData[currentEngineType].symptoms[symptomKey].content;
        
        if (currentEngineType === 'gasoline') {
            const canvas = document.getElementById('gauge-canvas');
            if (canvas) {
                createGaugeChart(canvas.getContext('2d'));
                const firstSubSymptom = document.querySelector('.sub-symptom-btn');
                if(firstSubSymptom) {
                   firstSubSymptom.click();
                } else {
                   animateGauge('normal'); // Default animation if no sub-symptoms
                }
            }
             const altitudeBtn = document.getElementById('altitude-btn');
             if(altitudeBtn) {
                 altitudeBtn.addEventListener('click', updateAltitude);
             }
        }
        
        document.querySelectorAll('.sub-symptom-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subSymptomKey = e.target.dataset.sub;
                const subContent = document.getElementById('sub-symptom-content');
                document.querySelectorAll('.sub-symptom-btn').forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
                e.target.classList.add('bg-blue-600', 'text-white');

                const data = appData.gasoline.subSymptoms[subSymptomKey];
                if (data) {
                    subContent.innerHTML = `
                        <h4 class="font-bold text-slate-800">${data.title}</h4>
                        <p class="text-sm text-slate-600 mt-1">${data.desc}</p>
                        <p class="text-sm font-semibold text-blue-700 mt-2">Next Step: ${data.next}</p>
                    `;
                }
                
                let animationType = 'normal'; // Default
                if (subSymptomKey.startsWith('low')) animationType = subSymptomKey;
                if (subSymptomKey.startsWith('fluct')) animationType = subSymptomKey;
                if (subSymptomKey.startsWith('other')) animationType = subSymptomKey;
                animateGauge(animationType);
            });
        });
    }
    
    function updateAltitude() {
        const input = document.getElementById('altitude-input');
        const resultEl = document.getElementById('altitude-result');
        if (!input || !resultEl) return;

        const altitude = parseInt(input.value, 10);
        if (isNaN(altitude) || altitude < 0) {
            resultEl.textContent = "Please enter a valid altitude.";
            return;
        }
        
        const correction = Math.round(altitude / 1000);
        const lowNormal = 17 - correction;
        const highNormal = 22 - correction;
        resultEl.textContent = `Expected Normal Range: ${lowNormal}-${highNormal} in. Hg`;
    }

    function createGaugeChart(ctx) {
        if (gaugeChart) {
            gaugeChart.destroy();
        }
        const needlePlugin = {
            id: 'gaugeNeedle',
            afterDatasetDraw(chart, args, options) {
                const { ctx, data } = chart;
                ctx.save();
                const xCenter = chart.getDatasetMeta(0).data[0].x;
                const yCenter = chart.getDatasetMeta(0).data[0].y;
                const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
                
                const value = data.datasets[0].needleValue;
                const angle = Math.PI + (value / 30) * Math.PI; // Assuming max gauge value is 30 for scaling

                ctx.translate(xCenter, yCenter);
                ctx.rotate(angle);
                
                // Draw Needle
                ctx.beginPath();
                ctx.moveTo(0, -5); // Base of the needle
                ctx.lineTo(outerRadius - 15, 0); // Tip of the needle
                ctx.lineTo(0, 5); // Other side of the base
                ctx.fillStyle = '#1e293b'; // slate-800
                ctx.fill();
                ctx.restore();

                // Needle hub
                ctx.beginPath();
                ctx.arc(xCenter, yCenter, 8, 0, Math.PI * 2);
                ctx.fillStyle = '#475569'; // slate-600
                ctx.fill();
            }
        };

        gaugeChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Low', 'Normal', 'High', 'Very High'], // Simplified labels
                datasets: [{
                    data: [10, 12, 5, 3], // Segments for the gauge face (0-10, 10-22, 22-27, 27-30)
                    backgroundColor: ['#ef4444', '#22c55e', '#f59e0b', '#ef4444'], // red, green, yellow, red
                    borderWidth: 0,
                    needleValue: 19 // Initial needle position (Normal)
                }]
            },
            options: {
                rotation: -90, // Start at the top
                circumference: 180, // Half circle
                cutout: '60%',
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            },
            plugins: [needlePlugin]
        });
    }

    function animateGauge(type) {
        if (!gaugeChart) return;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        let startTime = null;
        const duration = 2000; // ms for non-continuous animations

        function animationStep(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            let value;

            switch(type) {
                case 'low_5_10': value = 8; break;
                case 'low_10_15': value = 13; break;
                case 'low_15_18': value = 16; break;
                case 'other_high': value = 24; break;
                case 'other_exhaust':
                    // Simulates needle dropping over time, then holding
                    const exhaustProgress = Math.min(progress/duration, 1);
                    value = 19 - (exhaustProgress * 15); // Starts at 19, drops to 4
                    if (progress >= duration) { // Hold at low value
                        value = 4;
                         if (animationFrameId) cancelAnimationFrame(animationFrameId); // Stop after one cycle
                    }
                    break;
                case 'fluct_rhythmicDrop':
                    // Regular drop from normal (e.g., 19 down to 15 and back)
                    value = 19 - 4 * Math.abs(Math.sin(progress / 300)); // Adjust frequency/amplitude
                    break;
                case 'fluct_rapidFlutter':
                     // Fast small flutter around a point (e.g., 19 +/- 1 or 2)
                     value = 19 + 2 * Math.sin(progress / 50); // Adjust frequency/amplitude
                     break;
                case 'fluct_slowSweep':
                    // Slow sweep between two points (e.g., 14 to 19)
                    value = 16.5 + 2.5 * Math.sin(progress / 800); // Adjust center, amplitude, frequency
                    break;
                case 'normal': // Added for explicit normal state
                default:
                    value = 19;
                    break;
            }

            gaugeChart.data.datasets[0].needleValue = value;
            gaugeChart.update('none'); // 'none' for smoother animation if transitions are off

            // Continue animation for fluctuating types, or until duration for others
            if (type.startsWith('fluct') || (progress < duration && type !== 'other_exhaust')) {
               animationFrameId = requestAnimationFrame(animationStep);
            } else if (type === 'other_exhaust' && progress < duration) {
                 animationFrameId = requestAnimationFrame(animationStep);
            } else if (!type.startsWith('fluct')) { // Stop one-shot animations
                 if (animationFrameId) cancelAnimationFrame(animationFrameId);
            }
        }
        animationFrameId = requestAnimationFrame(animationStep);
    }


    function setupModal(modalId) {
        const modal = document.getElementById(`${modalId}-modal`);
        const openBtn = document.getElementById(`${modalId}-modal-btn`);
        const closeBtns = modal.querySelectorAll('.close-modal-btn');
        const contentDiv = document.getElementById(`${modalId}-content`);

        if(!modal || !openBtn || !closeBtns.length || !contentDiv) return; // Basic check

        contentDiv.innerHTML = appData.modals[modalId];

        openBtn.addEventListener('click', () => {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.querySelector('.modal-content').classList.remove('-translate-y-10');
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                 modal.classList.add('opacity-0', 'pointer-events-none');
                 modal.querySelector('.modal-content').classList.add('-translate-y-10');
            });
        });
    }

    gasBtn.addEventListener('click', () => {
        gasBtn.classList.add('active');
        dieselBtn.classList.remove('active');
        loadContent('gasoline');
    });

    dieselBtn.addEventListener('click', () => {
        dieselBtn.classList.add('active');
        gasBtn.classList.remove('active');
        loadContent('diesel');
    });

    init();
});

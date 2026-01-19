// Interactive Boids Swarm Animation
// Beautiful green swarm that responds to mouse

class Boid {
    constructor(x, y, z) {
        this.position = { x, y, z };
        this.velocity = {
            x: (Math.random() - 0.5) * 0.3,  // Reduced initial velocity
            y: (Math.random() - 0.5) * 0.15, // Reduced initial velocity
            z: (Math.random() - 0.5) * 0.3   // Reduced initial velocity
        };
        this.fadeOffset = Math.random() * Math.PI * 2;
        this.fadeSpeed = 0.5 + Math.random() * 0.5;
        // Shape morphing parameters
        this.morphOffset = Math.random() * Math.PI * 2;
        this.morphSpeed = 0.3 + Math.random() * 0.4;
        // Smooth orientation
        this.angle = Math.random() * Math.PI * 2; // Current display angle
    }
}

class SwarmAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.boids = [];
        this.mouse = { x: null, y: null, active: false };
        this.frame = 0;
        
        // Parameters matching Python simulation
        this.numBoids = 800;
        this.perceptionRadius = 25;
        // Target center will move dynamically
        
        // Brand green color
        this.baseGreen = { r: 16, g: 185, b: 129 };
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Mouse tracking on entire document (not just canvas)
        document.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
            this.mouse.y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
            this.mouse.active = true;
        });
        
        document.addEventListener('mouseleave', () => {
            this.mouse.active = false;
        });
        
        // Initialize boids - spread across the entire canvas area
        const worldWidth = this.canvas.width / this.scale;
        const worldHeight = this.canvas.height / this.scale;
        
        for (let i = 0; i < this.numBoids; i++) {
            const x = Math.random() * worldWidth;
            const y = Math.random() * worldHeight;
            const z = Math.random() * 100;
            this.boids.push(new Boid(x, y, z));
        }
        
        // Stabilize simulation
        for (let i = 0; i < 50; i++) {
            this.updatePhysics();
        }
        
        this.animate();
    }
    
    resize() {
        // Make canvas fill its parent container (content section)
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;
        
        // Use a base scale that works well for the boid simulation
        // Scale based on the smaller dimension to ensure full coverage
        this.scale = Math.min(this.canvas.width / 1400, this.canvas.height / 800);
        this.offsetX = 0;
        this.offsetY = 0;
    }
    
    getTargetCenters() {
        // Two centers of gravity moving independently
        const t = this.frame * 0.002; // Much slower movement
        
        // Get canvas dimensions in world coordinates
        const worldWidth = this.canvas.width / this.scale;
        const worldHeight = this.canvas.height / this.scale;
        const centerX = worldWidth / 2;
        const centerY = worldHeight / 2;
        
        // Movement radii - go almost to the edges
        const radiusX = worldWidth * 0.45;
        const radiusY = worldHeight * 0.45;
        
        // First center - circular motion clockwise
        const center1 = {
            x: centerX + Math.sin(t) * radiusX,
            y: centerY + Math.cos(t) * radiusY,
            z: 50 + Math.sin(t * 1.8) * 25
        };
        
        // Second center - figure-8 motion, counter-phase
        const center2 = {
            x: centerX + Math.sin(t + Math.PI) * radiusX * 0.8 + Math.cos(t * 1.4) * (radiusX * 0.4),
            y: centerY + Math.sin(t * 1.6 + Math.PI) * radiusY * 0.8,
            z: 50 + Math.sin(t * 2.2 + Math.PI) * 25
        };
        
        return [center1, center2];
    }
    
    updatePhysics() {
        const newVelocities = this.boids.map(() => ({ x: 0, y: 0, z: 0 }));
        
        // Get current moving target centers (now two!)
        const targetCenters = this.getTargetCenters();
        
        // Flocking behavior
        for (let i = 0; i < this.boids.length; i++) {
            const boid = this.boids[i];
            let separation = { x: 0, y: 0, z: 0 };
            let alignment = { x: 0, y: 0, z: 0 };
            let cohesion = { x: 0, y: 0, z: 0 };
            let neighborCount = 0;
            let closeCount = 0;
            
            // Find neighbors
            for (let j = 0; j < this.boids.length; j++) {
                if (i === j) continue;
                
                const other = this.boids[j];
                const dx = other.position.x - boid.position.x;
                const dy = other.position.y - boid.position.y;
                const dz = other.position.z - boid.position.z;
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                
                if (dist < this.perceptionRadius) {
                    neighborCount++;
                    
                    // Alignment
                    alignment.x += other.velocity.x;
                    alignment.y += other.velocity.y;
                    alignment.z += other.velocity.z;
                    
                    // Cohesion
                    cohesion.x += other.position.x;
                    cohesion.y += other.position.y;
                    cohesion.z += other.position.z;
                    
                    // Separation - larger zone to spread out more
                    if (dist < this.perceptionRadius * 0.9) {
                        closeCount++;
                        const factor = 1.0 / (dist + 0.0001);
                        separation.x -= dx * factor;
                        separation.y -= dy * factor;
                        separation.z -= dz * factor;
                    }
                }
            }
            
            if (neighborCount > 0) {
                // Alignment
                alignment.x = (alignment.x / neighborCount - boid.velocity.x) * 0.03;
                alignment.y = (alignment.y / neighborCount - boid.velocity.y) * 0.03;
                alignment.z = (alignment.z / neighborCount - boid.velocity.z) * 0.03;
                
                // Cohesion - very weak to prevent clumping
                cohesion.x = (cohesion.x / neighborCount - boid.position.x) * 0.0003; // Much weaker
                cohesion.y = (cohesion.y / neighborCount - boid.position.y) * 0.0003; // Much weaker
                cohesion.z = (cohesion.z / neighborCount - boid.position.z) * 0.0003;
                
                // Separation - stronger to prevent clumping
                if (closeCount > 0) {
                    const sepMag = Math.sqrt(separation.x**2 + separation.y**2 + separation.z**2);
                    if (sepMag > 0) {
                        separation.x = (separation.x / sepMag) * 2.5; // Much stronger
                        separation.y = (separation.y / sepMag) * 2.5;
                        separation.z = (separation.z / sepMag) * 2.5;
                    }
                }
                
                newVelocities[i].x = boid.velocity.x + separation.x + alignment.x + cohesion.x;
                newVelocities[i].y = boid.velocity.y + separation.y + alignment.y + cohesion.y;
                newVelocities[i].z = boid.velocity.z + separation.z + alignment.z + cohesion.z;
            } else {
                newVelocities[i] = { ...boid.velocity };
            }
        }
        
        // Apply forces
        for (let i = 0; i < this.boids.length; i++) {
            const boid = this.boids[i];
            
            // Dual center attraction - each boid is pulled by both centers
            // Find which center is closer and pull toward it more strongly
            const dist1 = Math.sqrt(
                Math.pow(targetCenters[0].x - boid.position.x, 2) +
                Math.pow(targetCenters[0].y - boid.position.y, 2) +
                Math.pow(targetCenters[0].z - boid.position.z, 2)
            );
            const dist2 = Math.sqrt(
                Math.pow(targetCenters[1].x - boid.position.x, 2) +
                Math.pow(targetCenters[1].y - boid.position.y, 2) +
                Math.pow(targetCenters[1].z - boid.position.z, 2)
            );
            
            // Pull toward both centers, but stronger toward the nearer one
            const totalDist = dist1 + dist2;
            const weight1 = dist2 / totalDist; // Closer center gets more weight
            const weight2 = dist1 / totalDist;
            
            const pullStrength = 0.001; // Much stronger gravitational pull
            
            const centerPull = {
                x: (targetCenters[0].x - boid.position.x) * pullStrength * weight1 +
                   (targetCenters[1].x - boid.position.x) * pullStrength * weight2,
                y: (targetCenters[0].y - boid.position.y) * pullStrength * weight1 +
                   (targetCenters[1].y - boid.position.y) * pullStrength * weight2,
                z: (targetCenters[0].z - boid.position.z) * pullStrength * weight1 +
                   (targetCenters[1].z - boid.position.z) * pullStrength * weight2
            };
            
            // Mouse interaction - repel from cursor
            if (this.mouse.active) {
                const mouseWorldX = (this.mouse.x - this.offsetX) / this.scale;
                const mouseWorldY = (this.mouse.y - this.offsetY) / this.scale;
                const dx = boid.position.x - mouseWorldX;
                const dy = boid.position.y - mouseWorldY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const repelRadius = 150; // Larger radius for more noticeable effect
                
                if (dist < repelRadius) {
                    const force = (1 - dist / repelRadius) * 2.0; // Stronger force
                    centerPull.x += (dx / (dist + 0.1)) * force;
                    centerPull.y += (dy / (dist + 0.1)) * force;
                }
            }
            
            // Wind forces - reduced for slower movement
            const phase = this.frame * 0.03;  // Slower phase progression
            const wind = {
                x: Math.sin(boid.position.x * 0.02 + phase) * 0.06 + 
                   Math.cos(boid.position.y * 0.05 + phase * 0.8) * 0.03,
                y: Math.sin(boid.position.x * 0.03 + phase * 0.9) * 0.02,
                z: 0
            };
            
            // Turbulence - increased for more swarming feel
            const turbulence = {
                x: (Math.random() - 0.5) * 0.08,
                y: (Math.random() - 0.5) * 0.08,
                z: (Math.random() - 0.5) * 0.08
            };
            
            // Update velocity
            boid.velocity.x = newVelocities[i].x + centerPull.x + wind.x + turbulence.x;
            boid.velocity.y = newVelocities[i].y + centerPull.y + wind.y + turbulence.y;
            boid.velocity.z = newVelocities[i].z + centerPull.z + wind.z + turbulence.z;
            
            // Speed limiting - much slower for calm aesthetic
            const speed = Math.sqrt(boid.velocity.x**2 + boid.velocity.y**2 + boid.velocity.z**2);
            const maxSpeed = 0.6;  // Reduced from 1.5
            const minSpeed = 0.15; // Reduced from 0.4
            
            if (speed > maxSpeed) {
                const factor = maxSpeed / speed;
                boid.velocity.x *= factor;
                boid.velocity.y *= factor;
                boid.velocity.z *= factor;
            } else if (speed < minSpeed && speed > 0) {
                const factor = minSpeed / speed;
                boid.velocity.x *= factor;
                boid.velocity.y *= factor;
                boid.velocity.z *= factor;
            }
            
            // Update position
            boid.position.x += boid.velocity.x;
            boid.position.y += boid.velocity.y;
            boid.position.z += boid.velocity.z;
        }
        
        this.frame++;
    }
    
    createPearShape(size, morphPhase) {
        const points = 20;
        const shape = [];
        
        // Morphing parameters that vary over time
        const bulge = 0.2 + 0.05 * Math.sin(morphPhase);           // Subtle bulge variation
        const elongation = 2.0 + 0.1 * Math.cos(morphPhase * 0.7); // Subtle elongation
        const ripple = 0.02 * Math.sin(morphPhase * 1.3);          // Edge ripple
        
        for (let i = 0; i < points; i++) {
            const t = (i / points) * Math.PI * 2;
            
            // Add subtle ripples to the edge
            const edgeRipple = ripple * Math.sin(t * 3);
            
            const x = Math.sin(t) * (0.7 + bulge * Math.cos(t) + edgeRipple) * size;
            const y = (Math.cos(t) * (elongation + 0.2 * Math.sin(t)) - 0.3) * size;
            shape.push({ x, y });
        }
        return shape;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Sort by depth
        const sortedBoids = this.boids.map((boid, idx) => ({ boid, idx }))
            .sort((a, b) => a.boid.position.z - b.boid.position.z);
        
        // Get z range for depth calculations
        const zValues = this.boids.map(b => b.position.z);
        const zMin = Math.min(...zValues);
        const zMax = Math.max(...zValues);
        const zRange = zMax - zMin || 1;
        
        // Draw each boid
        for (const { boid, idx } of sortedBoids) {
            const depth = (boid.position.z - zMin) / zRange;
            
            // Calculate target angle from velocity
            const targetAngle = Math.atan2(boid.velocity.y, boid.velocity.x);
            
            // Smooth rotation - gradually rotate toward target angle
            let angleDiff = targetAngle - boid.angle;
            // Handle angle wrapping (shortest path)
            if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            // Smooth interpolation (0.15 = rotation speed/smoothness)
            boid.angle += angleDiff * 0.15;
            
            // Depth-based orientation variation
            const depthAngleOffset = (0.5 - depth) * Math.PI * 0.3 + 
                                    Math.sin(boid.position.y * 0.1) * (1 - depth) * 0.4;
            const finalAngle = boid.angle + depthAngleOffset;
            
            // Size based on depth - made bigger for more visibility
            const sizeScale = (0.5 + 1.5 * depth) * this.scale * 1.2;
            
            // Calculate morphing phase for this boid
            const morphPhase = this.frame * 0.02 * boid.morphSpeed + boid.morphOffset;
            
            // Create pear shape with morphing
            const pear = this.createPearShape(sizeScale, morphPhase);
            
            // Transform to screen space
            const screenX = boid.position.x * this.scale + this.offsetX;
            const screenY = boid.position.y * this.scale + this.offsetY;
            
            // Rotate pear
            const cos = Math.cos(finalAngle);
            const sin = Math.sin(finalAngle);
            
            // Opacity
            const baseAlpha = 0.3 + 0.7 * depth;
            const fadeTime = this.frame * 0.05 * boid.fadeSpeed + boid.fadeOffset;
            const fadeFactor = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(fadeTime));
            const alpha = baseAlpha * fadeFactor;
            
            // Color intensity
            const colorIntensity = 0.6 + 0.4 * depth;
            const brightness = 0.5 + 0.5 * colorIntensity;
            const r = Math.floor(this.baseGreen.r * brightness);
            const g = Math.floor(this.baseGreen.g * brightness);
            const b = Math.floor(this.baseGreen.b * brightness);
            
            // Draw pear
            this.ctx.beginPath();
            for (let i = 0; i < pear.length; i++) {
                const rotX = pear[i].x * cos - pear[i].y * sin;
                const rotY = pear[i].x * sin + pear[i].y * cos;
                const x = screenX + rotX;
                const y = screenY + rotY;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            this.ctx.fill();
        }
    }
    
    animate() {
        this.updatePhysics();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    new SwarmAnimation('swarm-canvas');
});


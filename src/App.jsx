import { useState } from 'react';
import BorderGlow from './components/BorderGlow/BorderGlow';
import { 
  Sparkles, 
  Sliders, 
  Check, 
  Layers, 
  Cpu, 
  ArrowRight
} from 'lucide-react';
import './App.css';

const PRESETS = [
  {
    name: 'Purple Aurora',
    colors: ['#c084fc', '#f472b6', '#38bdf8'],
    glowColor: '280 80 70',
    glowHue: 280
  },
  {
    name: 'Sunset Ember',
    colors: ['#ff453a', '#ff9f0a', '#ffd60a'],
    glowColor: '20 90 60',
    glowHue: 20
  },
  {
    name: 'Toxic Emerald',
    colors: ['#30d158', '#66d4cf', '#0a84ff'],
    glowColor: '140 85 55',
    glowHue: 140
  },
  {
    name: 'Midnight Steel',
    colors: ['#ffffff', '#8e8e93', '#3a3a3c'],
    glowColor: '220 15 70',
    glowHue: 220
  }
];

function App() {
  // Playground State
  const [edgeSensitivity, setEdgeSensitivity] = useState(30);
  const [glowRadius, setGlowRadius] = useState(40);
  const [glowIntensity, setGlowIntensity] = useState(1.0);
  const [coneSpread, setConeSpread] = useState(25);
  const [borderRadius, setBorderRadius] = useState(28);
  const [animated, setAnimated] = useState(true);
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [glowHue, setGlowHue] = useState(PRESETS[0].glowHue);
  const [colors, setColors] = useState(PRESETS[0].colors);

  const selectPreset = (idx) => {
    setSelectedPresetIdx(idx);
    setColors(PRESETS[idx].colors);
    setGlowHue(PRESETS[idx].glowHue);
  };

  const glowColor = `${glowHue} 85% 65%`;

  // Code string representing current config
  const componentCode = `<BorderGlow
  edgeSensitivity={${edgeSensitivity}}
  glowColor="${glowColor}"
  backgroundColor="#120F17"
  borderRadius={${borderRadius}}
  glowRadius={${glowRadius}}
  glowIntensity={${glowIntensity}}
  coneSpread={${coneSpread}}
  animated={${animated}}
  colors={${JSON.stringify(colors)}}
>
  <div style={{ padding: '2.5em' }}>
    <h2>Your Content</h2>
  </div>
</BorderGlow>`;

  return (
    <div className="app-container">
      {/* Header Banner */}
      <header className="header-section">
        <span className="badge">React Bits Integration</span>
        <h1 className="main-title">BorderGlow Card</h1>
        <p className="subtitle">
          An interactive, directional mesh-gradient border and glow component that follows your cursor. Move your mouse near the card borders.
        </p>
      </header>

      {/* Main Interactive Playground */}
      <section>
        <div className="section-title">
          <Sliders size={24} style={{ color: '#c084fc' }} />
          <h2>Interactive Playground</h2>
        </div>
        <p className="section-subtitle">Experiment with properties and preview changes in real time.</p>

        <div className="playground-layout">
          {/* Column 1: Live Preview */}
          <div className="preview-container">
            <BorderGlow
              key={`${selectedPresetIdx}-${animated}`} // Remount on preset or animation toggle to trigger sweep intro
              edgeSensitivity={edgeSensitivity}
              glowColor={glowColor}
              backgroundColor="#120F17"
              borderRadius={borderRadius}
              glowRadius={glowRadius}
              glowIntensity={glowIntensity}
              coneSpread={coneSpread}
              animated={animated}
              colors={colors}
            >
              <div className="interactive-card-content">
                <div className="interactive-card-header">
                  <span className="interactive-card-badge">PREVIEW CARD</span>
                  <Sparkles size={16} style={{ color: '#c084fc' }} />
                </div>
                <div>
                  <h3 className="interactive-card-title">Move Cursor Close</h3>
                  <p className="interactive-card-text">
                    Hover near the edges or corners of this card to activate the directional color glow and the custom border.
                  </p>
                </div>
                <div className="interactive-card-footer">
                  <span>Interactive Playground</span>
                  <span className="hover-indicator">
                    Hover edges <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Column 2: Controls */}
          <div className="control-panel">
            <div className="control-group">
              <span className="control-group-title">Gradient Presets</span>
              <div className="gradient-presets">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={preset.name}
                    className={`preset-btn ${idx === selectedPresetIdx ? 'active' : ''}`}
                    onClick={() => selectPreset(idx)}
                  >
                    <div className="color-dots">
                      {preset.colors.map((c, i) => (
                        <span key={i} className="color-dot" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <span className="control-group-title">Glow Properties</span>
              
              <div className="slider-container">
                <div className="slider-info">
                  <span className="slider-label">Edge Sensitivity</span>
                  <span className="slider-value">{edgeSensitivity}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={edgeSensitivity}
                  onChange={(e) => setEdgeSensitivity(Number(e.target.value))}
                  className="custom-range"
                />
              </div>

              <div className="slider-container">
                <div className="slider-info">
                  <span className="slider-label">Glow Radius</span>
                  <span className="slider-value">{glowRadius}px</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={glowRadius}
                  onChange={(e) => setGlowRadius(Number(e.target.value))}
                  className="custom-range"
                />
              </div>

              <div className="slider-container">
                <div className="slider-info">
                  <span className="slider-label">Glow Intensity</span>
                  <span className="slider-value">{glowIntensity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={glowIntensity}
                  onChange={(e) => setGlowIntensity(Number(e.target.value))}
                  className="custom-range"
                />
              </div>

              <div className="slider-container">
                <div className="slider-info">
                  <span className="slider-label">Cone Spread</span>
                  <span className="slider-value">{coneSpread}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  value={coneSpread}
                  onChange={(e) => setConeSpread(Number(e.target.value))}
                  className="custom-range"
                />
              </div>

              <div className="slider-container">
                <div className="slider-info">
                  <span className="slider-label">Border Radius</span>
                  <span className="slider-value">{borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="custom-range"
                />
              </div>
            </div>

            <div className="row-controls">
              <div className="glow-color-picker">
                <span className="slider-label" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Glow Hue Picker</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={glowHue}
                  onChange={(e) => setGlowHue(Number(e.target.value))}
                  className="hsl-hue-bar"
                />
              </div>

              <label className="toggle-container">
                <input
                  type="checkbox"
                  checked={animated}
                  onChange={(e) => setAnimated(e.target.checked)}
                  className="checkbox-hidden"
                />
                <span className="custom-switch" />
                <span className="toggle-label">Mount Animation Sweep</span>
              </label>
            </div>

            <div className="control-group">
              <span className="control-group-title">React Usage Code</span>
              <div className="code-export-box">
                <div className="code-title">Configuration Props</div>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{componentCode}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preset Gallery Showcase Grid */}
      <section className="presets-section">
        <div className="section-title">
          <Layers size={24} style={{ color: '#38bdf8' }} />
          <h2>Real-world Showcase</h2>
        </div>
        <p className="section-subtitle">See how BorderGlow elements behave in mock UI applications.</p>

        <div className="showcase-grid">
          {/* Card 1: Pricing tier card */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="280 85% 65%"
            backgroundColor="#110d1a"
            borderRadius={24}
            glowRadius={50}
            glowIntensity={1.2}
            coneSpread={30}
            animated={true}
            colors={['#c084fc', '#f472b6', '#6366f1']}
          >
            <div className="pricing-card">
              <span className="pricing-title">PRO CREATOR</span>
              <div className="price-box">
                <span className="price">$29</span>
                <span className="price-period">/ month</span>
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature-item">
                  <Check size={16} className="check-icon" />
                  <span>Unlimited Custom Templates</span>
                </li>
                <li className="pricing-feature-item">
                  <Check size={16} className="check-icon" />
                  <span>Premium Directional Effects</span>
                </li>
                <li className="pricing-feature-item">
                  <Check size={16} className="check-icon" />
                  <span>API Integration Support</span>
                </li>
                <li className="pricing-feature-item">
                  <Check size={16} className="check-icon" />
                  <span>24/7 Priority Discord Help</span>
                </li>
              </ul>
              <button className="pricing-btn">Upgrade Plan</button>
            </div>
          </BorderGlow>

          {/* Card 2: Profile Card */}
          <BorderGlow
            edgeSensitivity={20}
            glowColor="200 85% 60%"
            backgroundColor="#0a121d"
            borderRadius={24}
            glowRadius={40}
            glowIntensity={1.0}
            coneSpread={20}
            animated={true}
            colors={['#38bdf8', '#0ea5e9', '#06b6d4']}
          >
            <div className="profile-card">
              <div className="profile-avatar-container">
                <img 
                  className="profile-avatar" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Joel Joy Avatar"
                />
                <span className="status-dot" />
              </div>
              <div>
                <h3 className="profile-name">Joel Joy</h3>
                <p className="profile-title">Full Stack Engineer & AI Enthusiast</p>
              </div>
              <div className="tag-list">
                <span className="tag">React.js</span>
                <span className="tag">Node.js</span>
                <span className="tag">Tailwind</span>
                <span className="tag">Firebase</span>
              </div>
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-num">45+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">90.4%</span>
                  <span className="stat-label">HSC Score</span>
                </div>
              </div>
            </div>
          </BorderGlow>

          {/* Card 3: Feature Highlight Card */}
          <BorderGlow
            edgeSensitivity={35}
            glowColor="20 85% 65%"
            backgroundColor="#140f0c"
            borderRadius={24}
            glowRadius={60}
            glowIntensity={1.3}
            coneSpread={28}
            animated={true}
            colors={['#ff453a', '#ff9f0a', '#ea580c']}
          >
            <div className="feature-spotlight">
              <div className="feature-top">
                <div className="icon-wrapper">
                  <Cpu size={24} />
                </div>
                <h3 className="feature-title">High Performance Core</h3>
                <p className="feature-desc">
                  Utilizes optimized CSS Custom Properties and RequestAnimationFrame for smooth transitions that compile at 60 FPS on any modern display.
                </p>
              </div>
              <div className="metric-box">
                <span className="metric-title">GPU RENDER TIME</span>
                <span className="metric-value">0.8ms</span>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      <footer className="footer-credit">
        <p>
          Designed & Integrated with 💜 by Antigravity IDE Agent for <a href="mailto:joeljoy8888@gmail.com" className="footer-link">Joel Joy</a>
        </p>
      </footer>
    </div>
  );
}

export default App;

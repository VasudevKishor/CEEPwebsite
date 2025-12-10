import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoLoop.css';

const LogoLoop = ({
    logos = [],
    speed = 20,
    direction = 'left', // left, right, up, down
    logoHeight = 64,
    gap = 32,
    hoverSpeed = null, // if 0 === pause on hover
    scaleOnHover = false,
    fadeOut = false,
    fadeOutColor = 'transparent',
    ariaLabel = 'logo loop',
}) => {
    const [hovered, setHovered] = useState(false);

    // call navigation hook unconditionally (must be before any early returns)
    const navigate = useNavigate();

    // Duplicate logos for a continuous loop
    const loopLogos = useMemo(() => (logos && logos.length > 0 ? [...logos, ...logos] : []), [logos]);

    if (!loopLogos || loopLogos.length === 0) return null;

    const isVertical = direction === 'up' || direction === 'down';
    const animationDirection = direction === 'right' || direction === 'down' ? 'reverse' : 'normal';
    const shouldPauseOnHover = hoverSpeed === 0;

    // Use a fixed animation duration (based on `speed`) so hovering does not
    // change the inline animation style and cause the animation to restart.
    // The speed parameter represents pixels per second, so duration is constant.
    const animStyle = {
        animationDuration: `${speed}s`,
        animationDirection: animationDirection,
        animationPlayState: hovered && shouldPauseOnHover ? 'paused' : 'running',
    };

    const wrapperClasses = [
        'logo-loop-wrapper',
        isVertical ? 'vertical' : 'horizontal',
        scaleOnHover ? 'scale-on-hover' : '',
        hovered ? 'hovered' : '',
        shouldPauseOnHover ? 'pause-on-hover' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const cssVars = {
        '--logo-gap': `${gap}px`,
        '--logo-height': `${logoHeight}px`,
    };

    // (navigation hook already called above)

    const renderLogoItem = (item, idx) => {
        const key = `logo-${idx}`;

        let content = null;
        if (React.isValidElement(item)) {
            content = item;
        } else if (typeof item === 'string') {
            content = <img src={item} alt={`logo-${idx}`} />;
        } else if (item && typeof item === 'object') {
            if (item.node) content = item.node;
            else if (item.src) content = <img src={item.src} alt={item.alt || `logo-${idx}`} />;
            else content = <span>{String(item)}</span>;
        } else {
            content = <span>{String(item)}</span>;
        }

        // If item has an href, for internal links use react-router navigate,
        // for external links open in new tab.
        const wrapped = content;

        const handleClick = (e) => {
            if (!item || !item.href) return;
            if (item.href.startsWith('/')) {
                // internal navigation
                e.preventDefault();
                navigate(item.href);
            } else {
                // external
                window.open(item.href, '_blank', 'noopener');
            }
        };

        const nodeStyle = {};
        if (React.isValidElement(item) || (item && item.node)) {
            nodeStyle.fontSize = `${logoHeight}px`;
            nodeStyle.display = 'inline-flex';
            nodeStyle.alignItems = 'center';
            nodeStyle.justifyContent = 'center';
            nodeStyle.height = `${logoHeight}px`;
        }

        return (
            <div
                className="logo-item"
                key={key}
                style={nodeStyle}
                onClick={item && item.href ? handleClick : undefined}
                role={item && item.href ? 'link' : undefined}
                tabIndex={item && item.href ? 0 : -1}
                onKeyDown={item && item.href ? (e) => { if (e.key === 'Enter') handleClick(e); } : undefined}
            >
                {wrapped}
            </div>
        );
    };

    return (
        <div
            className={wrapperClasses}
            style={{ ...cssVars }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            role="group"
            aria-label={ariaLabel}
        >
            {/* fade overlays removed to avoid visual edge artifacts */}

            <div
                className={`logo-loop ${isVertical ? 'vertical' : 'horizontal'}`}
                style={{ ...animStyle }}
            >
                {loopLogos.map((item, i) => renderLogoItem(item, i))}
            </div>
        </div>
    );
};

export default LogoLoop;

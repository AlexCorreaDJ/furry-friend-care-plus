
import React from 'react';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveLayout = ({ children, className }: ResponsiveLayoutProps) => {
  const { isSmallScreen, isMediumScreen, isLargeScreen, safeAreaTop, safeAreaBottom, isPortrait } = useScreenDimensions();

  return (
    <div 
      className={cn(
        "min-h-screen w-full bg-gradient-to-br from-blue-50 to-green-50",
        // Adaptação para telas pequenas (celulares)
        isSmallScreen && [
          "px-3 py-2",
          isPortrait ? "pb-4" : "pb-2"
        ],
        // Adaptação para telas médias (tablets)
        isMediumScreen && [
          "px-6 py-4"
        ],
        // Adaptação para telas grandes
        isLargeScreen && [
          "px-8 py-6"
        ],
        className
      )}
      style={{
        paddingTop: `max(1rem, ${safeAreaTop}px)`,
        paddingBottom: `max(1rem, ${safeAreaBottom}px)`
      }}
    >
      <div className={cn(
        "mx-auto",
        // Container responsivo baseado no tamanho da tela
        isSmallScreen && "max-w-full",
        isMediumScreen && "max-w-4xl",
        isLargeScreen && "max-w-6xl"
      )}>
        {children}
      </div>
    </div>
  );
};

export default ResponsiveLayout;

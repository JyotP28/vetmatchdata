import { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    try {
      // This triggers the ad to load once the component is mounted
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px 0', overflow: 'hidden' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
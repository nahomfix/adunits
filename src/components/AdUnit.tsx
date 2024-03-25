import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { FC, useEffect, useRef, useState } from "react";

export interface AdUnitMetaData {
    game_key: string;
    lorenzo_id?: string;
    region: string;
    environment: string;
    service_level: string;
    width: number;
    height: number;
    redirect_urls: string[];
    third_party_engagement: string[];
    dsp: string;
    ttd_imp_aud_user_ttl_min: string;
    ttd_adformat: string;
    ttd_adgroupid: string;
    ttd_advertiserid: string;
    ttd_all_categories: string;
    ttd_base_bid_override_metadata: string;
    ttd_campaignid: string;
    ttd_category: string;
    ttd_city: string;
    ttd_country: string;
    ttd_creativeid: string;
    ttd_dealid: string;
    ttd_deviceosfamily: string;
    ttd_devicetype: string;
    ttd_devicemake: string;
    ttd_devicemodel: string;
    ttd_gdpr_applies: string;
    ttd_gdpr_consent_strinG: string;
    ttd_impressionid: string;
    ttd_language: string;
    ttd_metro: string;
    ttd_partnerid: string;
    ttd_privatecontractid: string;
    ttd_publisherid: string;
    ttd_region: string;
    ttd_rendering_context: string;
    ttd_site: string;
    ttd_site_with_path: string;
    ttd_supplyvendor: string;
    ttd_tdid: string;
    ttd_trustesid: string;
    ttd_unix_timestamp: string;
    ttd_zipcode: string;
    adludio_brief_ref?: string;
}

interface AdUnitProps {
    id: string;
    src: string;
    data: AdUnitMetaData | undefined;
}

export const AdUnit: FC<AdUnitProps> = ({ id, src, data }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const adUnitRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (data) {
            const script = document.createElement("script");
            script.id = id;
            script.src = src;
            script.innerText = JSON.stringify(data);
            script.onload = () => setScriptLoaded(true);

            const position = adUnitRef.current;
            position?.appendChild(script);

            return () => {
                document
                    .querySelectorAll("#gameLoaderScript")
                    .forEach((gameLoaderScript) => gameLoaderScript.remove());

                setScriptLoaded(false);
            };
        }
    }, [data, id, src]);

    return (
        <Box
            id="adunit"
            ref={adUnitRef}
            sx={{
                position: "relative",
                minHeight: data?.height,
                minWidth: data?.width,
            }}
        >
            {!scriptLoaded && (
                <Skeleton variant="rectangular" width={320} height={480} />
            )}
        </Box>
    );
};

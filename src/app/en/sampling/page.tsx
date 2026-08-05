import SamplingCalculator from "@/components/SamplingCalculator";
import ContentReviewPanel from "@/components/ContentReviewPanel";
export default function EnglishSampling() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">PLACER SAMPLING · CALCULATION · QA/QC</p>
        <h1>Sampling formulae and grade tools</h1>
        <p className="lead">
          Convert measured sample volume and recovered gold into comparable
          results while preserving volume condition, moisture, bulk density,
          recovery, and duplicate variability.
        </p>
        <ContentReviewPanel lang="en" topic="sampling" />
      </div>
      <SamplingCalculator lang="en" />
      <article className="content">
        <h2>There is no universal sample volume</h2>
        <p>
          Required sample support depends on the largest particles,
          gold-particle size, grade variability, study purpose, and acceptable
          uncertainty. BLM guidance notes that larger and more closely spaced
          samples generally improve confidence. USGS guidance describes the
          severe nugget effect created by heterogeneous coarse gold.
        </p>
        <div className="notice">
          <strong>Practical sequence:</strong> begin with calibrated
          reconnaissance increments; enlarge cumulative volume at the same site;
          record gold from every increment; and continue increasing support and
          duplicate coverage while cumulative grade remains unstable. A pan is a
          targeting tool, not a mineral-resource sample.
        </div>
        <h2>Material-specific controls</h2>
        <ul>
          <li>
            <strong>Fine sand and silt:</strong> composite across the defined
            depositional unit and retain the original feed volume.
          </li>
          <li>
            <strong>Sand and gravel:</strong> record top size and oversize
            fraction; distinguish bank from loose volume.
          </li>
          <li>
            <strong>Cobble-rich gravel:</strong> use pits or trenches that
            represent the complete size distribution; do not sample only the
            fines.
          </li>
          <li>
            <strong>Clay false bottoms and bedrock contacts:</strong> sample
            contact intervals and cracks separately. Selective trap samples are
            not average layer grades.
          </li>
          <li>
            <strong>Black-sand concentrate:</strong> trace it back to the
            original feed volume. There is no fixed black-sand-to-gold
            conversion.
          </li>
          <li>
            <strong>Residual soil:</strong> use stratigraphic and spatial grids.
            Convert mass grade to volume grade only with site-measured density.
          </li>
        </ul>
        <h2>Authoritative references</h2>
        <p>
          <a
            className="button secondary"
            href="https://www.blm.gov/sites/default/files/docs/2026-04/PMRN_101_Guidebook_BLM_AK.pdf"
            target="_blank"
            rel="noreferrer"
          >
            BLM Alaska Placer Mining 101 (2026)
          </a>
        </p>
        <p>
          <a
            className="button secondary"
            href="https://pubs.usgs.gov/gip/prospect1/goldgip.html"
            target="_blank"
            rel="noreferrer"
          >
            USGS Gold — placer grades and g/m³
          </a>
        </p>
        <p>
          <a
            className="button secondary"
            href="https://pubs.usgs.gov/of/2008/1132/pdf/Pebble_OFR_2008-1132.pdf"
            target="_blank"
            rel="noreferrer"
          >
            USGS — nugget effect and analytical support
          </a>
        </p>
      </article>
    </>
  );
}

import { useMemo } from 'react';
import superjson from 'superjson';
import { useQueryParams, StringParam } from 'next-query-params';
import { ShareResultsImage } from '../components/Results/ShareResultsImage';
import { isPoliticiansPodiumArray } from '../utils/isPoliticiansPodiumArray';
import { isSharingVariant } from '../utils/isSharingVariant';

function SharePage() {
  const [query] = useQueryParams({
    sharingVariant: StringParam,
    politicians: StringParam,
  });
  const { sharingVariant, politicians } = query;
  const topThreePoliticians = useMemo(
    () => politicians && superjson.parse(politicians),
    [politicians],
  );

  if (!isSharingVariant(sharingVariant) || !isPoliticiansPodiumArray(topThreePoliticians)) {
    return null;
  }

  return (
    <ShareResultsImage sharingVariant={sharingVariant} topThreePoliticians={topThreePoliticians} />
  );
}
export default SharePage;

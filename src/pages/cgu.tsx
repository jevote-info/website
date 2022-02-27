import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Container, Heading, Text, Link } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import { HomeLayout } from '../components/HomeLayout';
import { fetchSurvey } from '../services/survey';

interface CGUProps {
  surveyPath: string;
}

export const getStaticProps: GetStaticProps<CGUProps> = async ({ preview = false }) => {
  const survey = await fetchSurvey({ previewMode: preview });
  const firstCategory = survey[0];
  const firstQuestion = firstCategory.questions[0];

  return {
    props: {
      surveyPath: `/categories/${firstCategory.slug}/questions/${firstQuestion.order}`,
    },
  };
};

function CGU(props: CGUProps) {
  const { surveyPath } = props;

  return (
    <>
      <Head>
        <title>JeVote</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout surveyPath={surveyPath}>
        <Container h="full" maxW="container.lg">
          <Heading as="h1" size="xl" margin="64px 0 32px 0">
            Conditions Générales d&apos;Utilisation
          </Heading>
          <Text>
            Cette page a pour objectif d&apos;informer l&apos;utilisateur des conditions
            d&apos;utilisations du site Jevote.info
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 1 : Objet
          </Heading>
          <Text>
            Le site internet jevote.info ci-après dénommé, Jevote.info, est accessible à l’adresse
            URL{' '}
            <NextLink href="/" passHref>
              <Link isExternal fontWeight="bold">
                www.jevote.info <ExternalLinkIcon mx="2px" />
              </Link>
            </NextLink>
            .
            <br />
            Le site web Jevote.info est un site internet français qui a pour objet de proposer un
            questionnaire sur plusieurs sujets politiques dans l’optique de l’élection
            présidentielle de 2022 afin d’aider les citoyens à être en possession de tous les
            éléments pour construire leur choix de vote.
            <br />
            Le site Jevote.info s’adresse à un large public.
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 2 : Définitions
          </Heading>
          <Text>
            La présente clause a pour objet de définir les différents termes essentiels du contrat :
            <br />
            Utilisateur : ce terme désigne toute personne qui utilise le site ou l&apos;un des
            services proposés par le site.
            <br />
            Contenu utilisateur : ce sont les données transmises par l&apos;Utilisateur au sein du
            site.
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 3 : Mentions légales et acceptation des conditions générales d’utilisation
          </Heading>
          <Text>
            Les présentes « conditions générales d&apos;utilisation » ont pour objet
            l&apos;encadrement juridique des modalités de mise à disposition des services du site
            Jevote.info et leur utilisation par « l&apos;Utilisateur ». Les conditions générales
            d&apos;utilisation doivent être acceptées par tout Utilisateur souhaitant accéder au
            site. Elles constituent le contrat entre le site et l&apos;Utilisateur. L’accès au site
            par l’Utilisateur signifie son acceptation des présentes conditions générales
            d’utilisation et vaut signature. En cas de non-acceptation des conditions générales
            d&apos;utilisation stipulées dans le présent contrat, l&apos;Utilisateur se doit de
            renoncer à l&apos;accès des services proposés par le site.
            <br />
            Jevote.info se réserve le droit de modifier unilatéralement et à tout moment le contenu
            des présentes conditions générales d&apos;utilisation. Les nouvelles CGU entreront en
            vigueur à compter de leur date de mise en ligne sur le site Jevote.info. Les nouvelles
            CGU s’imposent à l’Utilisateur qui doit se référer régulièrement à la rubrique «
            Mentions légales et conditions générales d’utilisation » du site Jevote.info pour
            vérifier les CGU en vigueur au moment de sa connexion.
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 4 : Utilisation des cookies
          </Heading>
          <Text>
            Jevote.info n’utilise que des cookies nécessaires au fonctionnement du site.
            <br />
            Cela permet de conserver les réponses de l’Utilisateur malgré un rechargement de la
            page.
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            Article 5 : Droit d’auteur
          </Heading>
          <Text>
            L’ensemble des éléments constituant le site internet Jevote.info (textes, graphismes,
            logiciels, photographies, images, sons, plans, logos, marques, créations et œuvres
            protégeables diverses, bases de données, etc…) ainsi que le site lui-même, relèvent des
            législations françaises et internationales sur les droits d’auteurs et les droits
            voisins du droit d’auteur (notamment les articles L.122-4 et L.122-5 du Code de la
            Propriété Intellectuelle).
            <br />
            En conséquence, toute personne qui vient à consulter le site Jevote.info et utiliser ses
            services, s’engage notamment à ne pas :<br />
            - Intégrer tout ou partie du contenu du site web Jevote.info dans un site tiers, à des
            fins commerciales ou non,
            <br />
            - Copier les informations sur des supports de toute nature permettant de reconstituer
            tout ou partie des fichiers d’origine.
            <br />
            Toute utilisation non expressément autorisée d’éléments du site Jevote.info entraîne une
            violation des droits d’auteur et constitue une contrefaçon. Elle peut aussi entraîner
            une violation de droits à l’image, droits des personnes ou de tous autres droits et
            réglementation en vigueur. Elle peut donc engager la responsabilité civile ou pénale de
            son auteur.
            <br />
            L’équipe de Jevote.info se réserve la possibilité de saisir toutes voies de droit à
            l’encontre des personnes qui n’auraient pas respecté les interdictions contenues dans le
            présent article.
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 6 : Données personnelles
          </Heading>
          <Text>
            Seuls les résultats du questionnaire sont collectés et conservés à des fins
            statistiques. Aucune donnée à caractère personnel n’est traitée.
            <br />
            Les résultats sont enregistrés 1 an à compter de leur collecte.
            <br />
            Le responsable du traitement est Jevote.Info dont les coordonnées sont{' '}
            <NextLink href="mailto:jevoteinfo@gmail.com" passHref>
              <Link isExternal fontWeight="bold">
                jevoteinfo@gmail.com <ExternalLinkIcon mx="2px" />
              </Link>
            </NextLink>
            . Les destinataires sont limités aux{' '}
            <NextLink href="/contributeurs" passHref>
              <Link isExternal fontWeight="bold">
                contributeurs <ExternalLinkIcon mx="2px" />
              </Link>
            </NextLink>{' '}
            de Jevote.Info.
            <br />
            Conformément à la loi n°78 -17 du 6 janvier 1978 modifiée le 6 août 2004 relative à
            l’informatique et aux libertés, l’Utilisateur dispose d’un droit d’accès de
            rectification, d’effacement, de limitation, et de portabilité aux informations qui le
            concernent ainsi que du droit de retirer son consentement à tout moment.
            <br />
            Toutefois, Jevote.info ne collectant pas les données permettant d’identifier
            l’Utilisateur, les droits énumérés ci-dessus ne sont pas applicables (article 11.2 du
            Règlement UE 2016/679 dit Règlement général sur la protection des données).
            <br />
            L’Utilisateur a le droit d’introduire une réclamation auprès de la Commission nationale
            de l’informatique et des libertés (
            <NextLink href="https://www.cnil.fr/" passHref>
              <Link isExternal fontWeight="bold">
                www.cnil.fr <ExternalLinkIcon mx="2px" />
              </Link>
            </NextLink>
            ).
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 7 : Accès aux services
          </Heading>
          <Text>
            Le site permet à l&apos;Utilisateur un accès gratuit aux services suivants :<br />-{' '}
            <NextLink href={surveyPath} passHref>
              <Link isExternal fontWeight="bold">
                Questionnaire <ExternalLinkIcon mx="2px" />
              </Link>
            </NextLink>
            <br />-{' '}
            <NextLink href="/resultats" passHref>
              <Link isExternal fontWeight="bold">
                Résultats <ExternalLinkIcon mx="2px" />
              </Link>
            </NextLink>
            <br />
            Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à
            Internet. Tous les frais supportés par l&apos;Utilisateur pour accéder au service
            (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge. Le site
            met en œuvre tous les moyens mis à sa disposition pour assurer un accès de qualité à ses
            services. L&apos;obligation étant de moyens, le site ne s&apos;engage pas à atteindre ce
            résultat. Tout événement dû à un cas de force majeure ayant pour conséquence un
            dysfonctionnement du réseau ou du serveur n&apos;engage pas la responsabilité de
            Jevote.info.
            <br />
            L&apos;accès aux services du site peut à tout moment faire l&apos;objet d&apos;une
            interruption, d&apos;une suspension, d&apos;une modification sans préavis pour une
            maintenance ou pour tout autre cas. L&apos;Utilisateur ne peut réclamer aucune
            indemnisation suite à l&apos;interruption, à la suspension ou à la modification du
            présent contrat.
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 8 : Propriété intellectuelle
          </Heading>
          <Text>
            Les marques, logos, signes et tout autre contenu du site font l&apos;objet d&apos;une
            protection par le Code de la propriété intellectuelle et plus particulièrement par le
            droit d&apos;auteur. L&apos;Utilisateur sollicite l&apos;autorisation préalable du site
            pour toute reproduction, publication, copie des différents contenus. L&apos;Utilisateur
            s&apos;engage à une utilisation des contenus du site dans un cadre strictement privé.
            Une utilisation des contenus à des fins commerciales est strictement interdite. Tout
            contenu mis en ligne par l&apos;Utilisateur est de sa seule responsabilité.
            L&apos;Utilisateur s&apos;engage à ne pas mettre en ligne de contenus pouvant porter
            atteinte aux intérêts de tierces personnes. Tout recours en justice engagé par un tiers
            lésé contre le site sera pris en charge par l&apos;Utilisateur. Le contenu de
            l&apos;Utilisateur peut être à tout moment et pour n&apos;importe quelle raison supprimé
            ou modifié par le site. L&apos;Utilisateur ne reçoit aucune justification et
            notification préalablement à la suppression ou à la modification du contenu Utilisateur.
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 9 : Responsabilité et force majeure
          </Heading>
          <Text>
            Les sources des informations diffusées sur le site sont réputées fiables. Toutefois, le
            site se réserve la faculté d&apos;une non-garantie de la fiabilité des sources. Les
            informations données sur le site le sont à titre purement informatif. Ainsi,
            l&apos;Utilisateur assume seul l&apos;entière responsabilité de l&apos;utilisation des
            informations et contenus du présent site. Tout usage du service par l&apos;Utilisateur
            ayant directement ou indirectement pour conséquence des dommages à l’encontre de
            Jevote.info doit faire l&apos;objet d&apos;une indemnisation au profit dudit site.
            <br />
            Jevote.info décline toute responsabilité :<br />
            - En cas d’interruption du site Jevote.info pour des opérations de maintenance
            techniques ou d’actualisation des informations publiées, en cas d’impossibilité
            momentanée d’accès aux Espaces et services en ligne (et/ou aux sites leur étant liés) en
            raison de problèmes techniques et ce quelles qu’en soient l’origine et la provenance ;
            <br />
            - En cas de dommage directs ou indirects causés à l’Utilisateur, quelle qu’en soit la
            nature, résultant du contenu, de l’accès, ou de l’utilisation du site Jevote.info (et/ou
            des sites qui lui sont liés) ;<br />
            - En cas d’utilisation anormale ou d’une exploitation illicite du site Jevote.info
            L’Utilisateur du site Jevote.info est alors seul responsable des dommages causés aux
            tiers et des conséquences des réclamations ou actions qui pourraient en découler. <br />
            L’Utilisateur renonce également à exercer tout recours contre Jevote.info dans le cas de
            poursuites diligentées par un tiers à son encontre du fait de l’utilisation et/ou de
            l’exploitation illicite du site.
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 10 : Liens hypertextes
          </Heading>
          <Text>
            De nombreux liens hypertextes sortants sont présents sur le site, cependant les pages
            web où mènent ces liens n&apos;engagent en rien la responsabilité de Jevote.info qui
            n&apos;a pas le contrôle de ces liens. L&apos;Utilisateur s&apos;interdit donc à engager
            la responsabilité du site concernant le contenu et les ressources relatives à ces liens
            hypertextes sortants.
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 11 : Droit applicable et juridiction compétente
          </Heading>
          <Text>
            La législation française s&apos;applique au présent contrat. En cas d&apos;absence de
            résolution amiable d&apos;un litige né entre les parties, seuls les tribunaux du ressort
            de la Cour d’appel de Paris sont compétents.
          </Text>
          <Heading as="h2" size="lg" margin="32px 0 16px 0">
            ARTICLE 12 : Évolution du contrat
          </Heading>
          <Text>
            Le site se réserve à tout moment le droit de modifier unilatéralement les clauses
            stipulées dans le présent contrat.
            <br />
            La durée du présent contrat est indéterminée. Le contrat produit ses effets à
            l&apos;égard de l&apos;Utilisateur à compter de l&apos;utilisation du service.
          </Text>
        </Container>
      </HomeLayout>
    </>
  );
}

export default CGU;

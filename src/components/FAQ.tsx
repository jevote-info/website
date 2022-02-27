import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Accordion, Heading, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import CitizenUnderline from './CitizenUnderline';
import FAQItem from './FAQItem';

const FAQ = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Heading
        as="h3"
        size={isMobile ? '2xl' : '3xl'}
        textAlign="center"
        marginTop="64px"
        marginBottom="64px"
      >
        En savoir plus sur notre{' '}
        <Text as="span" color="primary.600" position="relative" display="inline-block">
          initiative citoyenne
          <CitizenUnderline />
        </Text>{' '}
        :
      </Heading>
      <Accordion width="100%">
        <FAQItem title="Comment fonctionne le site ?">
          <Text as="p">
            Sur jevote.info, il n’y a pas d’inscription. Vous accédez au questionnaire de manière
            totalement anonyme. Nous avons récolté, analysé et retranscrit les programmes des
            candidats à la présidentielle de 2022. Pour plus de lisibilité, les questions sont
            classées par thème : société, fonctionnement de l’Etat et des institutions, fiscalité,
            politique économique et sociale et immigration, politique environnementale, affaires
            étrangères et défense, justice, énergie, santé. Vous pouvez remplir le questionnaire
            dans l’ordre de votre choix et en ouvrant à nouveau jevote.info vous reprendrez
            exactement là où vous en étiez.
            <br />
            Pour chaque question, vous préciserez si le sujet vous tient à cœur ou non (vous aurez
            le choix entre “peu important”, “neutre”, “important”). Ces critères seront pris en
            compte par l’algorithme et influeront donc sur les résultats.
          </Text>
        </FAQItem>
        <FAQItem title="Mes données sont-elles stockées ?">
          <Text as="p">
            Nous stockons uniquement les résultats obtenus au questionnaire. Cependant, aucune
            donnée personnelle n’est enregistrée, vos réponses sont totalement anonymes. Nous ne
            vendrons ou ne partagerons aucune donnée à des tiers.
            <br />
            <br />
            Nous stockons ces données pour le bon fonctionnement du site ; fonctionnalité de
            partage, résolutions d’éventuels bugs et amélioration de certaines parties.
            <br />
            Ces données sont hébergées par une entreprise française (Scalingo) et ne seront en aucun
            cas visibles par une personne extérieure à l’équipe de jevote.info.
          </Text>
        </FAQItem>
        <FAQItem title="Comment vous financez-vous ?">
          <Text as="p">
            Notre équipe est entièrement indépendante et n’est reliée à aucun parti politique,
            entreprise ou association.
            <br />
            jevote.info est une initiative citoyenne à but non lucratif.
            <br />
            <br />
            Nous ne souhaitons pas recevoir de don ou une quelconque aide financière, l’équipe
            travaille bénévolement et prend les frais du site à sa charge.
          </Text>
        </FAQItem>
        <FAQItem title="Comment fonctionne l'algorithme ?">
          <Text as="p">
            Pour chaque candidat, chaque réponse est notée avec un score compris entre -1 et 1. Pour
            chacune de vos réponses, nous additionnons le score de proximité avec chaque candidat
            afin d’obtenir un score global de proximité. Tous les candidats n’ont pas les mêmes
            scores maximum et minimum possibles, c’est pourquoi nous normalisons le score brut afin
            d’obtenir un résultat entre -100 et 100.
            <br />
            Notre projet est open-source, retrouvez le code source du projet sur notre{' '}
            <NextLink href="https://github.com/jevote-info/website/" passHref>
              <Link isExternal fontWeight="bold">
                dépôt github <ExternalLinkIcon mx="2px" />
              </Link>
            </NextLink>{' '}
            et les{' '}
            <NextLink href="https://github.com/jevote-info/website/" passHref>
              <Link isExternal fontWeight="bold">
                matrices de notation (TODO) <ExternalLinkIcon mx="2px" />
              </Link>
            </NextLink>
          </Text>
        </FAQItem>
        <FAQItem title="Quelles sont les sources utilisées ?">
          <Text as="p">
            Les sources utilisées sont très variées, des programmes des candidats aux articles de
            presse recensant leurs prises de positions sur des sujets politiques. Nous avons
            notamment beaucoup utilisé le comparateur de programmes du journal Le Monde.
            <br />
            Étant donné que tous les candidats n&apos;évoquent pas tous les sujets dans leurs
            programmes, nous nous référons parfois à des prises de position dans des médias, en
            considérant qu&apos;elles valent engagement puisqu&apos;elles sont données en réponse à
            des questions de journalistes, dans le cadre de la campagne présidentielle.
            <br />
            Si aucune prise de position explicite n’est disponible, nous nous référons aux prises de
            positions traditionnelles des familles politiques des candidats sur le sujet en
            question.
            <br />
            Il y a donc une marge d’erreur même si essayons d’être aussi précis que possible. Par
            ailleurs, les candidats pouvant modifier ou affiner leurs positions sur des sujets au
            cours de la campagne, nous refléterons ces évolutions dans notre scoring.
            <br />
            Vous pouvez consulter notre{' '}
            <NextLink href="https://github.com/jevote-info/website/" passHref>
              <Link isExternal fontWeight="bold">
                matrice de notation (TODO) <ExternalLinkIcon mx="2px" />
              </Link>
            </NextLink>{' '}
            pour avoir une idée plus précise de certaines sources utilisées.
          </Text>
        </FAQItem>
        <FAQItem title="Pourquoi avons-nous lancé cette initiative ?">
          <Text as="p">
            En 2017, encore étudiants, nous avions lancé jevote.info avec pour ambition d’intéresser
            les citoyens à la politique en vue de l’élection présidentielle, et de les inciter à
            voter. Nous n’avions aucune idée de comment notre initiative serait reçue, mais à notre
            échelle, ce fut un succès, avec plus de 700 000 questionnaires remplis, et de nombreux
            retours positifs. À l’aube des élections 2022, l’importance de faire renaître
            jevote.info face au risque d’une abstention élevée, couplée aux sollicitations d’anciens
            utilisateurs, nous a motivés.
            <br />
            <br />
            Il peut être difficile de suivre les propositions des candidats si l’on ne s’intéresse
            pas habituellement à la politique. Ainsi, comme en 2017, nous avons parcouru les
            programmes des candidats à l’élection présidentielle ainsi que leurs prises de position
            dans les médias afin de vous permettre de les traduire sous forme de questionnaire.
            <br />
            L’objectif est de permettre aux utilisateurs de voir où ils se situent par rapport aux
            candidats, mais aussi de les inciter à consulter de manière plus approfondie leurs
            programmes et à s’intéresser à l’actualité politique, avec un seul objectif : un maximum
            de participation au vote en avril 2022 !
          </Text>
        </FAQItem>
      </Accordion>
    </>
  );
};

export default FAQ;

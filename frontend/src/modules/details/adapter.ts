import { Activity } from 'modules/activities/interface';
import { Choices } from 'modules/filters/interface';
import { getThumbnail } from 'modules/utils/adapter';
import { dataUnits } from 'modules/results/adapter';
import { Difficulty } from 'modules/filters/difficulties/interface';
import { formatDistance } from 'modules/results/utils';
import { CourseType } from 'modules/filters/courseType/interface';
import { NetworkDictionnary } from 'modules/networks/interface';
import { Poi } from 'modules/poi/interface';
import { TouristicContent } from 'modules/touristicContent/interface';
import { Details, RawDetails } from './interface';

export const adaptResults = ({
  rawDetails,
  activity,
  difficulty,
  courseType,
  networks,
  themes,
  pois,
  touristicContents,
}: {
  rawDetails: RawDetails;
  activity: Activity;
  difficulty: Difficulty | null;
  courseType: CourseType | null;
  networks: NetworkDictionnary;
  themes: Choices;
  pois: Poi[];
  touristicContents: TouristicContent[];
}): Details => {
  return {
    title: rawDetails.name,
    place: rawDetails.departure,
    imgUrl: getThumbnail(rawDetails.attachments),
    practice: activity,
    transport: rawDetails.public_transport,
    access_parking:
      rawDetails.access.length > 0 && rawDetails.advised_parking.length > 0
        ? `${rawDetails.access}\n${rawDetails.advised_parking}`
        : `${rawDetails.access}${rawDetails.advised_parking}`,
    description_teaser: rawDetails.description_teaser,
    ambiance: rawDetails.ambiance,
    description: rawDetails.description,
    tags: rawDetails.themes.map(themeId => themes[themeId].label),
    informations: {
      duration: rawDetails.duration !== null ? `${rawDetails.duration}${dataUnits.time}` : null,
      distance: `${formatDistance(rawDetails.length_2d)}`,
      elevation: `+${rawDetails.ascent}${dataUnits.distance}`,
      networks: rawDetails.networks.map(networkId => networks[networkId]),
      difficulty,
      courseType,
    },
    pois,
    trekGeometry: rawDetails.geometry.coordinates.map(rawCoordinates => ({
      x: rawCoordinates[0],
      y: rawCoordinates[1],
    })),
    trekDeparture: {
      x: rawDetails.geometry.coordinates[0][0],
      y: rawDetails.geometry.coordinates[0][1],
    },
    trekArrival: {
      x: rawDetails.geometry.coordinates[rawDetails.geometry.coordinates.length - 1][0],
      y: rawDetails.geometry.coordinates[rawDetails.geometry.coordinates.length - 1][1],
    },
    touristicContents,
    parkingLocation: {
      x: rawDetails.parking_location[0],
      y: rawDetails.parking_location[1],
    },
    pdfUri: rawDetails.pdf,
    gpxUri: rawDetails.gpx,
    kmlUri: rawDetails.kml,
  };
};

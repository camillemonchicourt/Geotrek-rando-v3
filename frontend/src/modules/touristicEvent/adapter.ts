import { getAttachments, getThumbnail, getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { CityDictionnary } from '../city/interface';
import { Choices } from '../filters/interface';
import { SourceDictionnary } from '../source/interface';
import { TouristicContent } from '../touristicContent/interface';
import { TouristicEventTypeChoices } from '../touristicEventType/interface';
import { fallbackImgUri } from '../trekResult/adapter';
import { PopupResult } from '../trekResult/interface';
import { getGlobalConfig } from '../utils/api.config';
import {
  RawTouristicEvent,
  RawTouristicEventDetails,
  TouristicEvent,
  TouristicEventDetails,
} from './interface';

export const adaptTouristicEvents = ({
  rawTouristicEvents,
  themeDictionnary,
  cityDictionnary,
  touristicEventType,
}: {
  rawTouristicEvents: RawTouristicEvent[];
  themeDictionnary: Choices;
  cityDictionnary: CityDictionnary;
  touristicEventType: TouristicEventTypeChoices;
}): TouristicEvent[] => {
  return rawTouristicEvents.map(rawTouristicEvent => {
    return {
      id: rawTouristicEvent.id,
      type: 'TOURISTIC_EVENT',
      name: rawTouristicEvent.name,
      attachments: getAttachments(rawTouristicEvent.attachments || []),
      geometry: adaptGeometry(rawTouristicEvent.geometry),
      thumbnailUris: getThumbnails(rawTouristicEvent.attachments || []),
      themes: rawTouristicEvent?.themes?.map(themeId => themeDictionnary[themeId]?.label) ?? [],
      place: cityDictionnary?.[rawTouristicEvent?.cities?.[0]]?.name ?? '',
      typeEvent: touristicEventType[Number(rawTouristicEvent?.type)],
      beginDate: rawTouristicEvent.begin_date,
      endDate: rawTouristicEvent.end_date,
      logoUri: rawTouristicEvent.approved ? getGlobalConfig().touristicContentLabelImageUri : null,
    };
  });
};

export const adaptTouristicEventDetails = ({
  rawTouristicEventDetails,
  themeDictionnary,
  cityDictionnary,
  sourcesDictionnary,
  touristicContents,
  touristicEventType,
}: {
  rawTouristicEventDetails: RawTouristicEventDetails;
  themeDictionnary: Choices;
  cityDictionnary: CityDictionnary;
  touristicContents: TouristicContent[];
  sourcesDictionnary: SourceDictionnary;
  touristicEventType: TouristicEventTypeChoices;
}): TouristicEventDetails => {
  return {
    // We use the original adapter
    ...adaptTouristicEvents({
      rawTouristicEvents: [
        {
          ...rawTouristicEventDetails.properties,
          geometry: rawTouristicEventDetails.geometry,
        },
      ],
      themeDictionnary,
      cityDictionnary,
      touristicEventType,
    })[0],
    // then we add missing fields
    description: rawTouristicEventDetails.properties.description,
    descriptionTeaser: rawTouristicEventDetails.properties.description_teaser,
    bbox: {
      corner1: { x: rawTouristicEventDetails.bbox[0], y: rawTouristicEventDetails.bbox[1] },
      corner2: { x: rawTouristicEventDetails.bbox[2], y: rawTouristicEventDetails.bbox[3] },
    },
    cities: rawTouristicEventDetails.properties.cities?.map(id => cityDictionnary[id]?.name) ?? [],
    id: rawTouristicEventDetails.id,
    touristicContents,
    participantNumber: rawTouristicEventDetails.properties.participant_number,
    pdfUri: rawTouristicEventDetails.properties.pdf,
    meetingPoint: rawTouristicEventDetails.properties.meeting_point,
    duration: rawTouristicEventDetails.properties.duration,
    sources:
      rawTouristicEventDetails?.properties?.source?.map(sourceId => sourcesDictionnary[sourceId]) ??
      [],
    contact: rawTouristicEventDetails.properties.contact,
    email: rawTouristicEventDetails.properties.email,
    website: rawTouristicEventDetails.properties.website,
    accessibility: rawTouristicEventDetails.properties.accessibility,
    organizer: rawTouristicEventDetails.properties.organizer,
    speaker: rawTouristicEventDetails.properties.speaker,
    targetAudience: rawTouristicEventDetails.properties.target_audience,
    practicalInfo: rawTouristicEventDetails.properties.practical_info,
    booking: rawTouristicEventDetails.properties.booking,
    meetingTime: rawTouristicEventDetails.properties.meeting_time,
  };
};

export const adaptTouristicEventPopupResults = ({
  rawTouristicEventPopupResult,
  cityDictionnary,
}: {
  rawTouristicEventPopupResult: RawTouristicEventDetails;
  cityDictionnary: CityDictionnary;
}): PopupResult => {
  return {
    title: rawTouristicEventPopupResult.properties.name,
    place: cityDictionnary?.[rawTouristicEventPopupResult?.properties?.cities?.[0]]?.name ?? '',
    imgUrl: getThumbnail(rawTouristicEventPopupResult.properties.attachments) ?? fallbackImgUri,
  };
};

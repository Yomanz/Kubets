// GENERATED CODE -- DO NOT EDIT!

// package: kubemq
// file: kubemq.proto

import * as kubemq_pb from "./kubemq_pb";
import * as grpc from "grpc";

interface IkubemqService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sendEvent: grpc.MethodDefinition<kubemq_pb.Event, kubemq_pb.Result>;
  sendEventsStream: grpc.MethodDefinition<kubemq_pb.Event, kubemq_pb.Result>;
  subscribeToEvents: grpc.MethodDefinition<kubemq_pb.Subscribe, kubemq_pb.EventReceive>;
  subscribeToRequests: grpc.MethodDefinition<kubemq_pb.Subscribe, kubemq_pb.Request>;
  sendRequest: grpc.MethodDefinition<kubemq_pb.Request, kubemq_pb.Response>;
  sendResponse: grpc.MethodDefinition<kubemq_pb.Response, kubemq_pb.Empty>;
  sendQueueMessage: grpc.MethodDefinition<kubemq_pb.QueueMessage, kubemq_pb.SendQueueMessageResult>;
  sendQueueMessagesBatch: grpc.MethodDefinition<kubemq_pb.QueueMessagesBatchRequest, kubemq_pb.QueueMessagesBatchResponse>;
  receiveQueueMessages: grpc.MethodDefinition<kubemq_pb.ReceiveQueueMessagesRequest, kubemq_pb.ReceiveQueueMessagesResponse>;
  streamQueueMessage: grpc.MethodDefinition<kubemq_pb.StreamQueueMessagesRequest, kubemq_pb.StreamQueueMessagesResponse>;
  ackAllQueueMessages: grpc.MethodDefinition<kubemq_pb.AckAllQueueMessagesRequest, kubemq_pb.AckAllQueueMessagesResponse>;
  ping: grpc.MethodDefinition<kubemq_pb.Empty, kubemq_pb.PingResult>;
}

export const kubemqService: IkubemqService;

export class kubemqClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  sendEvent(argument: kubemq_pb.Event, callback: grpc.requestCallback<kubemq_pb.Result>): grpc.ClientUnaryCall;
  sendEvent(argument: kubemq_pb.Event, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.Result>): grpc.ClientUnaryCall;
  sendEvent(argument: kubemq_pb.Event, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.Result>): grpc.ClientUnaryCall;
  sendEventsStream(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<kubemq_pb.Event, kubemq_pb.Result>;
  sendEventsStream(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<kubemq_pb.Event, kubemq_pb.Result>;
  subscribeToEvents(argument: kubemq_pb.Subscribe, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<kubemq_pb.EventReceive>;
  subscribeToEvents(argument: kubemq_pb.Subscribe, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<kubemq_pb.EventReceive>;
  subscribeToRequests(argument: kubemq_pb.Subscribe, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<kubemq_pb.Request>;
  subscribeToRequests(argument: kubemq_pb.Subscribe, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<kubemq_pb.Request>;
  sendRequest(argument: kubemq_pb.Request, callback: grpc.requestCallback<kubemq_pb.Response>): grpc.ClientUnaryCall;
  sendRequest(argument: kubemq_pb.Request, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.Response>): grpc.ClientUnaryCall;
  sendRequest(argument: kubemq_pb.Request, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.Response>): grpc.ClientUnaryCall;
  sendResponse(argument: kubemq_pb.Response, callback: grpc.requestCallback<kubemq_pb.Empty>): grpc.ClientUnaryCall;
  sendResponse(argument: kubemq_pb.Response, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.Empty>): grpc.ClientUnaryCall;
  sendResponse(argument: kubemq_pb.Response, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.Empty>): grpc.ClientUnaryCall;
  sendQueueMessage(argument: kubemq_pb.QueueMessage, callback: grpc.requestCallback<kubemq_pb.SendQueueMessageResult>): grpc.ClientUnaryCall;
  sendQueueMessage(argument: kubemq_pb.QueueMessage, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.SendQueueMessageResult>): grpc.ClientUnaryCall;
  sendQueueMessage(argument: kubemq_pb.QueueMessage, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.SendQueueMessageResult>): grpc.ClientUnaryCall;
  sendQueueMessagesBatch(argument: kubemq_pb.QueueMessagesBatchRequest, callback: grpc.requestCallback<kubemq_pb.QueueMessagesBatchResponse>): grpc.ClientUnaryCall;
  sendQueueMessagesBatch(argument: kubemq_pb.QueueMessagesBatchRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.QueueMessagesBatchResponse>): grpc.ClientUnaryCall;
  sendQueueMessagesBatch(argument: kubemq_pb.QueueMessagesBatchRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.QueueMessagesBatchResponse>): grpc.ClientUnaryCall;
  receiveQueueMessages(argument: kubemq_pb.ReceiveQueueMessagesRequest, callback: grpc.requestCallback<kubemq_pb.ReceiveQueueMessagesResponse>): grpc.ClientUnaryCall;
  receiveQueueMessages(argument: kubemq_pb.ReceiveQueueMessagesRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.ReceiveQueueMessagesResponse>): grpc.ClientUnaryCall;
  receiveQueueMessages(argument: kubemq_pb.ReceiveQueueMessagesRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.ReceiveQueueMessagesResponse>): grpc.ClientUnaryCall;
  streamQueueMessage(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<kubemq_pb.StreamQueueMessagesRequest, kubemq_pb.StreamQueueMessagesResponse>;
  streamQueueMessage(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<kubemq_pb.StreamQueueMessagesRequest, kubemq_pb.StreamQueueMessagesResponse>;
  ackAllQueueMessages(argument: kubemq_pb.AckAllQueueMessagesRequest, callback: grpc.requestCallback<kubemq_pb.AckAllQueueMessagesResponse>): grpc.ClientUnaryCall;
  ackAllQueueMessages(argument: kubemq_pb.AckAllQueueMessagesRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.AckAllQueueMessagesResponse>): grpc.ClientUnaryCall;
  ackAllQueueMessages(argument: kubemq_pb.AckAllQueueMessagesRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.AckAllQueueMessagesResponse>): grpc.ClientUnaryCall;
  ping(argument: kubemq_pb.Empty, callback: grpc.requestCallback<kubemq_pb.PingResult>): grpc.ClientUnaryCall;
  ping(argument: kubemq_pb.Empty, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.PingResult>): grpc.ClientUnaryCall;
  ping(argument: kubemq_pb.Empty, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<kubemq_pb.PingResult>): grpc.ClientUnaryCall;
}
